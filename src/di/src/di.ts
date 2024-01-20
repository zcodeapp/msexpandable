import "reflect-metadata";
import * as CryptoJS from 'crypto-js';
import {
  IDi,
  TConstructor,
  IDiInstance,
  IDiOptions,
  IDiConstructor
} from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Di implements IDi {

  /**
   * Singleton instance of dependency injection
   */
  static instance: IDi;

  /**
   * List of instances
   */
  private readonly _instances: IDiInstance[] = [];

  /**
   * Method for get singleton instance
   * 
   * @param _options Options for construct instance
   * @returns Instance
   */
  static getInstance(_options?: IDiConstructor): IDi {
    if (_options?.cleanSingleton)
      this.instance = undefined;
      
    if (!this.instance)
      this.instance = new Di(_options);
    else if(_options)
      this.instance.updateOptions(_options);

    return this.instance;
  }

  /**
   * Method for construct instance
   *
   * @param _options Options for construct instance
   */
  public constructor(
    private _options?: IDiConstructor
  ) { }

  /**
   * Method for update options of instance without new create
   * 
   * @param _options Options for construct instance
   */
  public updateOptions(_options: IDiConstructor): void {
    this._options = _options;
  }

  /**
   * Method for register a dependency
   *
   * @param key Identification dependency
   * @param options Options for dependency
   */
  public register<T>(key: TConstructor<T> | string, options?: IDiOptions): void {

    const unique = this._getKey(key);
    const exists = this._instances.find(x => x.unique == unique);
    
    if (exists && this._options?.restrictRewriteKey)
      throw new Error(`Error on try overwrite instance [${key.toString()}]`);

    const payload = {
      key,
      unique,
      singleton: options?.singleton ?? true,
      instance: null,
      value: options?.value ?? undefined,
      providers: options?.providers ?? [],
      factory: options?.factory ?? undefined
    };

    if (exists)
      this._instances[this._instances.findIndex(x => x.unique == unique)] = payload;
    else
      this._instances.push(payload);
  }

  /**
   * Method for add providers for dependency
   * 
   * @param key Identification dependency
   * @param providers List providers for dependency
   */
  public provider<T = any>(key: TConstructor<T>, providers: any[]): void {
    const instance = this._findInstance(key);
    instance.providers = [...instance.providers, ...providers];
  }

  /**
   * Method for get dependency
   *
   * @param key Identification dependency
   * @returns Instance or string|number|bool information
   */
  public get<T>(key: TConstructor<T> | string): T {

    const instance = this._findInstance(key);

    if (instance.instance)
      return instance.instance;
      
    const providers = this._getInstanceProviders(instance);

    if (instance.singleton) {
      instance.instance = this._getInstance(instance, providers);
      return instance.instance;
    }

    return this._getInstance(instance, providers);
  }

  /**
   * Method for find dependency
   *
   * @param key Identification dependency
   * @returns 
   */
  private _findInstance<T>(key: TConstructor<T> | string): IDiInstance {
    const unique = this._getKey(key);
    const instance = this._instances.find(x => x.unique == unique);
    const index = this._instances.findIndex(x => x.unique == unique);

    if (index < 0 || !instance)
      throw new Error(`Instance not found [${key.toString()}]`);
    
    return instance;
  }

  /**
   * Method for get providers constructor of class, using "reflect-metadata"
   *
   * @param instance Instance to extract metadata
   * @returns Class constructor metadata
   */
  private _getInstanceProviders(instance: IDiInstance) {
    if (typeof instance.key == "function") {
      const existingMetadata = Reflect.getMetadata('design:paramtypes', instance.key) || [];
      if (existingMetadata && existingMetadata.length > 0) {
        const exclude: string[] = [];
        return existingMetadata.map(metadata => this._parseMetadataValue(instance, metadata, exclude));
      }
    }
    return [];
  }

  /**
   * Method to find dependencies based "reflect-metadata" values
   *
   * @param instance Instance for get dependencies
   * @param metadata Metadata of class constructor param
   * @param exclude Exclude used dependencies
   * @returns Dependency
   */
  private _parseMetadataValue(instance: IDiInstance, metadata: any, exclude: string[]) {
    const type = (metadata?.name ?? "").toLowerCase();
    
    if (!type || type == "")
      throw new Error(`Param constructor from metadata empty [${instance.key.toString()}]`);

    for (const provider in instance.providers) {
      const depType = (typeof instance.providers[provider]).toLowerCase();
      if (depType != "" && depType == type && !exclude.find(x => x == provider)) {
        exclude.push(provider);
        return instance.providers[provider];
      }
    }

    return this.get(type);
  }

  /**
   * Method for get unique key for dependency identity
   *
   * @param key 
   * @returns 
   */
  private _getKey<T>(key: TConstructor<T> | string): string {
    let _key = JSON.stringify(key);
    if (typeof key == "string")
      _key = key.toLocaleLowerCase();
    
    if (typeof key == "function")
      _key = key.name.toLocaleLowerCase();
  
  
    return CryptoJS.MD5(JSON.stringify(_key)).toString();
  }

  /**
   * Method for get instance value
   *
   * @param instance Instance for get value
   * @param providers Providers of instance constructor
   * @returns Instance or string|number|bool
   */
  private _getInstance(instance: IDiInstance, providers?: any[]) {
    if (instance.factory && typeof instance.factory == "function") {
      return instance.factory();
    }
    
    if (typeof instance.key == "string") {
      if (instance.value == undefined || instance.value == "")
        throw new Error(`Configuration not have value [${instance.key}]`);

      return instance.value;
    }
    
    if (typeof instance.key == "function")
      return new instance.key(...this._providers(providers.length > 0 ? providers : instance.providers));
  }

  /**
   * Method for get dependency or just return value
   * 
   * @param providers List of providers
   * @returns Provider value
   */
  private _providers(providers: any[]) {
    return providers.map(provider => {
      try {
        return this.get(provider);
      } catch {
        return provider;
      }
    });
  }
}
