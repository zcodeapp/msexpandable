import { IDi, TConstructor } from "@zcodeapp-packages/interfaces";

export class Di implements IDi {
  static instance: IDi;

  static getInstance(): IDi {
    if (!this.instance)
      this.instance = new Di();

    return this.instance;
  }

  private _instances = new Map<TConstructor<any> | string, { singleton: boolean, instance: any, args: any }>();

  public register<T, Args extends any[] = any>(key: TConstructor<T> | string, args?: Args, isSingleton?: boolean): void {
    if (this._instances.get(key))
      throw new Error(`Error on try overwrite instance [${key.toString()}]`);
    
    if (typeof key === 'string') {
      this._instances.set(key, {
        singleton: isSingleton ?? false,
        instance: null,
        args
      });
      return;
    }
    
    this._instances.set(key, {
      singleton: isSingleton ?? false,
      instance: null,
      args: args ?? []
    });
  }

  public get<T>(key: TConstructor<T> | string): T {
    const instance = this._instances.get(key);

    if (!instance)
      throw new Error(`Instance not found [${key.toString()}]`);

    if (instance.instance)
      return instance.instance;

    if (instance.singleton) {
      if (typeof key == 'string')
        instance.instance = this.args(instance.args);
      else
        instance.instance = new key(...this.args(instance.args));

      this._instances.set(key, instance);
      return instance.instance;
    }

    if (typeof key == 'string')
      return instance.args;

    return new key(...this.args(instance.args));
  }

  private args(args: any) {
    if (typeof args === 'string' || typeof args === 'function')
      return args;
    
    for (var i in args) {
      let value;
      switch(typeof args[i]) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'function':
          try {
            value = this.get(args[i]);
          } catch {
            value = args[i];
          }
          break;
        default:
          value = this.get(args[i]);
          break;
      }
      args[i] = value
    }

    return args;
  }
}