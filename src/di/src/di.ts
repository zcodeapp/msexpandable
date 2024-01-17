import "reflect-metadata";
import { IDi, TConstructor, IDiInstance } from "@zcodeapp/interfaces";
import * as CryptoJS from 'crypto-js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Di implements IDi {

  static instance: IDi;
  private readonly PARAMS_METADATA = 'design:paramtypes';
  private readonly _instances: IDiInstance[] = [];

  static getInstance(): IDi {
    if (!this.instance)
      this.instance = new Di();

    return this.instance;
  }

  public register<T, Args extends any[] = any>(key: TConstructor<T> | string, args?: Args, isSingleton?: boolean): void {

    const unique = this.getKey(key);
    if (this._instances.find(x => x.unique == unique))
      throw new Error(`Error on try overwrite instance [${key.toString()}]`);

    this._instances.push({
      key,
      unique,
      singleton: isSingleton ?? false,
      instance: null,
      args
    });
  }

  public get<T>(key: TConstructor<T> | string): T {

    const instance = this.findInstance(key);

    if (instance.instance)
      return instance.instance;
      
    const args = this.getArgs(instance);

    if (instance.singleton) {
      if (typeof instance.key == 'string')
        instance.instance = instance.args;
      else
        instance.instance = new instance.key(...this.args(args.length > 0 ? args : instance.args));

      // this._instances[index] = instance;
      return instance.instance;
    }

    if (typeof instance.key == 'string')
       return instance.args as T;

    return new instance.key(...this.args(args.length > 0 ? args : instance.args));
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
    for(const item in existingMetadata) {
      let value;
      const type = (existingMetadata[item]?.name ?? "").toLowerCase();
      if (type && type != "") {
        for (const dep in instance.args) {
          const depType = (typeof instance.args[dep]).toLowerCase();
          if (depType != "" && depType == type)
            value = instance.args[dep];

          const depTypeConstructor = (instance.args[dep]?.name ?? "").toLowerCase();
          if (depTypeConstructor != "" && depTypeConstructor == type)
            value = instance.args[dep];
        }
        if (!value) {
          const instance = this.get(type);
          if (instance)
            value = instance;
        }
      }
      if (!value) {
        throw new Error(`Param constructor not found [${existingMetadata[item]?.name}]`);
      }
      args.push(value);
    }
    return args;
  }

  private getArgs(instance: IDiInstance) {
    let args = [];
    if (typeof instance.key == "function") {
      const existingMetadata = Reflect.getMetadata(this.PARAMS_METADATA, instance.key) || [];
      if (existingMetadata && existingMetadata.length > 0) {
        args = this.parseMetadata(instance, existingMetadata) ?? [];
      }
    }

    return args;
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
}
