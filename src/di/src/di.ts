import "reflect-metadata";
import * as CryptoJS from 'crypto-js';
import {
  IDi,
  TConstructor,
  IDiInstance,
  IDiOptions,
  IDiConstructor,
  ILogger,
  IDiGetOptions,
  IDiGetOptionsProviders
} from "@zcodeapp/interfaces";
import { Logger } from "@zcodeapp/logger";

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
      
    if (!this.instance) {
      const _logger = _options?.logger ?? Logger.getInstance();
      this.instance = new Di(_logger, _options);
    } else if(_options)
      this.instance.updateOptions(_options);

    return this.instance;
  }

  /**
   * Method for construct instance
   *
   * @param _options Options for construct instance
   */
  public constructor(
    private readonly _logger: ILogger,
    private _options?: IDiConstructor
  ) {
    this._logger.addPrefix("[Di] ");
    this.register(Di, {
      factory: () => Di.getInstance()
    });
    this.register(Logger, {
      factory: () => this._logger
    });
    this.register(Date, {
      factory: () => new Date()
    });
  }

  /**
   * Method for update options of instance without new create
   * 
   * @param _options Options for construct instance
   */
  public updateOptions(_options: IDiConstructor): void {
    this._logger.warn("Update options", { _options });
    this._options = _options;
  }

  /**
   * Method for register a dependency
   *
   * @param key Identification dependency
   * @param options Options for dependency
   */
  public register<T>(key: TConstructor<T> | string, options?: IDiOptions): void {

    try {
      this._logger.debug("Register instance", { key, options, diOptions: this._options });

      const unique = this._getKey(key);
      const exists = this._instances.find(x => x.unique == unique);
      
      this._logger.debug("Unique and exists data", { unique, exists });
      
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
      
      this._logger.debug("Payload for register", { payload });

      if (exists)
        this._instances[this._instances.findIndex(x => x.unique == unique)] = payload;
      else
        this._instances.push(payload);

      this._logger.debug("Success register key", { key, options });
    } catch (ex) {
      this._logger.fatal("Fatal error on try register instance", { key, options, ex });
      throw ex;
    }
  }

  /**
   * Method for add providers for dependency
   * 
   * @param key Identification dependency
   * @param providers List providers for dependency
   */
  public provider<T = any>(key: TConstructor<T>, providers: any[]): void {
    try {
      this._logger.debug("Add provider for instance", { key, providers });
      const instance = this._findInstance(key);
      instance.providers = [...instance.providers, ...providers];
      this._logger.debug("Success add provider for instance", { key, providers });
    } catch (ex) {
      this._logger.fatal("Fatal error on try add provider", { key, ex });
      throw ex;
    }
  }

  /**
   * Method for get dependency
   *
   * @param key Identification dependency
   * @returns Instance or string|number|bool information
   */
  public get<T>(key: TConstructor<T> | string, options?: IDiGetOptions): T {

    try {

      options = { ... {
        providers: []
      }, ... options ?? {} };

      this._logger.debug("Try get instance", { key, options });

      const instance = this._findInstance(key);

      if (instance.instance && options.providers.length == 0) {
        this._logger.debug("Return singleton instance");
        return instance.instance;
      }

      const _providers = this._getInstanceProviders(instance);

      if (instance.singleton && options.providers.length == 0) {
        instance.instance = this._getInstance(instance, _providers);
        this._logger.debug("Return singleton instance");
        return instance.instance;
      }

      this._logger.debug("Return non-singleton instance");
      return this._getInstance(instance, _providers, options.providers);
    } catch (ex) {
      this._logger.fatal("Fatal error on try get instance", { key, ex });
      throw ex;
    }
  }

  /**
   * Method for find dependency
   *
   * @param key Identification dependency
   * @returns 
   */
  private _findInstance<T>(key: TConstructor<T> | string): IDiInstance {

    const unique = this._getKey(key);

    this._logger.debug("Try find instance", { unique });

    const instance = this._instances.find(x => x.unique == unique);
    const index = this._instances.findIndex(x => x.unique == unique);
    
    this._logger.debug("Success find instance", { instance, index });

    if (index < 0 || !instance) {
      throw new Error(`Instance not found [${key.toString()}]`);
    }
    
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
      this._logger.debug("Try get metadata from Reflect", { instance });
      const existingMetadata = Reflect.getMetadata('design:paramtypes', instance.key) || [];
      if (existingMetadata && existingMetadata.length > 0) {
        this._logger.debug("Success get metadata from Reflect", { existingMetadata });
        const exclude: string[] = [];
        return existingMetadata.map(metadata => this._parseMetadataValue(instance, metadata, exclude));
      }
    }
    this._logger.debug("Return empty metadata");
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
    
    this._logger.debug("Try parse metadata", { instance, metadata, exclude });

    if (!type || type == "")
      throw new Error(`Param constructor from metadata empty [${instance.key.toString()}]`);

    this._logger.debug("Try find into instance providers");
    
    return instance.providers.find((provider, index) => {
      const depType = (typeof provider).toLowerCase();
      if (depType == type && !exclude.find(x => x == String(index))) {
        exclude.push(String(index));
        this._logger.debug("Success find providers into instance", { index, provider });
        return provider;
      }
    }) ?? this.get(type);
  }

  /**
   * Method for get unique key for dependency identity
   *
   * @param key 
   * @returns 
   */
  private _getKey<T>(key: TConstructor<T> | string): string {
    this._logger.debug("Get hash key for instance", { key });
      
    let _key = JSON.stringify(key);
    if (typeof key == "string")
      _key = key.toLocaleLowerCase();
    
    if (typeof key == "function")
      _key = key.name.toLocaleLowerCase();

    this._logger.debug("Key for hash", { key, _key });
  
    const result = CryptoJS.MD5(JSON.stringify(_key)).toString();

    this._logger.debug("Success get key hash for instance", { key, result });

    return result;
  }

  /**
   * Method for get instance value
   *
   * @param instance Instance for get value
   * @param providers Providers of instance constructor
   * @returns Instance or string|number|bool
   */
  private _getInstance(instance: IDiInstance, providers?: any[], getProviders?: IDiGetOptionsProviders[]) {
    if (instance.factory && typeof instance.factory == "function") {
      this._logger.debug("Return factory", { instance });
      return instance.factory();
    }
    
    if (typeof instance.key == "string") {

      if (instance.value == undefined || instance.value == "")
        throw new Error(`Configuration not have value [${instance.key}]`);

      this._logger.debug("Return string value", { value: instance.value });
      return instance.value;
    }
    
    if (typeof instance.key == "function") {
      this._logger.debug("Return function value", { providers, instanceProviders: instance.providers });
      return new instance.key(...this._providers(providers.length > 0 ? providers : instance.providers, getProviders));
    }
  }

  /**
   * Method for get dependency or just return value
   * 
   * @param providers List of providers
   * @returns Provider value
   */
  private _providers(providers: any[], getProviders?: IDiGetOptionsProviders[]) {
    this._logger.debug("Return providers for construct", { providers });
    return providers.map(provider => {
      
      const _provider = getProviders && getProviders.find(x => {
        if (typeof x.class == "string")
          return x.class == provider;

        let providerName = provider.name;
        if (provider.constructor.name != "Function")
          providerName = provider.constructor.name
         
        return x.class.name == providerName;
      });
      
      if (_provider)
        return _provider.factory();
      
      try {
        this._logger.debug("Try return from get method");
        return this.get(provider);
      } catch {
        this._logger.debug("Method get have error, return provider");
        return provider;
      }
    });
  }
}
