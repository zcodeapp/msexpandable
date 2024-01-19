import "reflect-metadata";
import { IDi, TConstructor, IDiInstance, IDiOptions, IDiConstructor } from "@zcodeapp/interfaces";
import * as CryptoJS from 'crypto-js';
// import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Di implements IDi {

  static instance: IDi;
  private readonly PARAMS_METADATA = 'design:paramtypes';
  private readonly _instances: IDiInstance[] = [];

  static getInstance(_options?: IDiConstructor): IDi {
    if (_options?.cleanSingleton)
      this.instance = undefined;
      
    if (!this.instance)
      this.instance = new Di(_options);
    else
      if(_options)
        this.instance.updateOptions(_options);

    return this.instance;
  }

  public constructor(
    private _options?: IDiConstructor
  ) { }

  public updateOptions(_options: IDiConstructor): void {
    this._options = _options;
  }

  public register<T>(key: TConstructor<T> | string, options?: IDiOptions): void {

    const unique = this.getKey(key);
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

    if (exists) {
      const index = this._instances.findIndex(x => x.unique == unique);
      this._instances[index] = payload;
    } else {
      this._instances.push(payload);
    }
  }

  public provider<T = any>(key: TConstructor<T>, providers: any[]): void {
    const instance = this.findInstance(key);
    instance.providers = [...instance.providers, ...providers];
  }

  public get<T>(key: TConstructor<T> | string): T {

    const instance = this.findInstance(key);

    if (instance.instance)
      return instance.instance;
      
    const providers = this.getArgs(instance);

    if (instance.singleton) {
      instance.instance = this.getInstance(instance, providers);
      return instance.instance;
    }

    return this.getInstance(instance, providers);
  }

  private findInstance<T>(key: TConstructor<T> | string): IDiInstance {
    const unique = this.getKey(key);
    const instance = this._instances.find(x => x.unique == unique);
    const index = this._instances.findIndex(x => x.unique == unique);

    if (index < 0 || !instance)
      throw new Error(`Instance not found [${key.toString()}]`);
    
    return instance;
  }

  private parseMetadata(instance: IDiInstance, existingMetadata: any[]): any {
    const args = [];
    const loaded: string[] = [];
    for(const item in existingMetadata) {
      let value;
      const type = (existingMetadata[item]?.name ?? "").toLowerCase();
      if (type && type != "") {
        const _args = instance.providers;
        for (const dep in _args) {
          const depType = (typeof _args[dep]).toLowerCase();
          if (depType != "" && depType == type && !loaded.find(x => x == dep)) {
            value = _args[dep];
            loaded.push(dep);
            break;
          }

          // const depTypeConstructor = (_args[dep]?.name ?? "").toLowerCase();
          // if (depTypeConstructor != "" && depTypeConstructor == type && !loaded.find(x => x == dep)) {
          //   value = _args[dep];
          //   loaded.push(dep);
          //   break;
          // }
        }
        if (!value) {
          const instance = this.get(type);
          if (instance)
            value = instance;
        }
      }
      if (!value) {
        throw new Error(`Param constructor not found [${instance.key.toString()}]`);
      }
      args.push(value);
    }
    return args;
  }

  private getArgs(instance: IDiInstance) {
    if (typeof instance.key == "function") {
      const existingMetadata = Reflect.getMetadata(this.PARAMS_METADATA, instance.key) || [];
      if (existingMetadata && existingMetadata.length > 0) {
        return this.parseMetadata(instance, existingMetadata);
      }
    }
    return [];
  }

  private getKey<T>(key: TConstructor<T> | string): string {
    let _key = JSON.stringify(key);
    if (typeof key == "string")
      _key = key.toLocaleLowerCase();
    
    if (typeof key == "function")
      _key = key.name.toLocaleLowerCase();
  
  
    return CryptoJS.MD5(JSON.stringify(_key)).toString();
  }

  private args(args: any[]) {
    const _args: any[] = [];
    
    for (const i in args) {
      let value;
      try {
        value = this.get(args[i]);
      } catch {
        value = args[i];
      }
      _args[i] = value
    }

    return _args;
  }

  private getInstance(instance: IDiInstance, providers?: any[]) {
    if (instance.factory && typeof instance.factory == "function") {
      return instance.factory();
    } else {
      if (typeof instance.key == "string") {
        if (instance.value == undefined || instance.value == "")
          throw new Error(`Configuration not have value [${instance.key}]`);

        return instance.value;
      } else {
        return new instance.key(...this.args(providers.length > 0 ? providers : instance.providers));
      }
    }
  }
}
