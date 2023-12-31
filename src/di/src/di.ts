import "reflect-metadata";
import { IDi, TConstructor } from "@zcodeapp/interfaces";
import * as CryptoJS from 'crypto-js';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface IDiInstance {
  key: string,
  singleton?: boolean,
  instance?: any,
  args?: any
}

export class Di implements IDi {
  static instance: IDi;

  static getInstance(): IDi {
    if (!this.instance)
      this.instance = new Di();

    return this.instance;
  }

  // private _instances = new Map<TConstructor<any> | string, { singleton: boolean, instance: any, args: any }>();
  private _instances: IDiInstance[] = [];

  // args = function | [class] | string

  public register<T, Args extends any[] = any>(key: TConstructor<T> | string, args?: Args, isSingleton?: boolean): void {
    const md5 = CryptoJS.MD5(JSON.stringify(typeof key == "string" ? key : key.name)).toString();
    if (this._instances.find(x => x.key == md5))
      throw new Error(`Error on try overwrite instance [${key.toString()}]`);
    
    this._instances.push({
      key: md5,
      singleton: isSingleton ?? false,
      instance: null,
      args
    });
  }

  public get<T>(key: TConstructor<T> | string): T {
    const md5 = CryptoJS.MD5(JSON.stringify(typeof key == "string" ? key : key.name)).toString();
    const instance = this._instances.find(x => x.key == md5);
    const index = this._instances.findIndex(x => x.key == md5);

    if (!instance)
      throw new Error(`Instance not found [${key.toString()}]`);

    if (instance.instance)
      return instance.instance;

    if (instance.singleton) {
      if (typeof key == 'string')
        instance.instance = instance.args;
      else
        instance.instance = new key(...this.args(instance.args));

      //this._instances.set(key, instance);
      this._instances[index] = instance;
      return instance.instance;
    }

    if (typeof key == 'string')
       return instance.args as T;

    return new key(...this.args(instance.args));
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
