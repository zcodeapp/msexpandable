import { IDi, TConstructor } from "@zcodeapp-packages/interfaces";

export class Di implements IDi {
  static instance: IDi;

  static getInstance(): IDi {
    if (!this.instance)
      this.instance = new Di();

    return this.instance;
  }

  private _instances = new Map<TConstructor<any> | string, any>();

  public register<T>(key: TConstructor<T> | string, isSingleton?: boolean | string, args?: any): void {
    if (this._instances.get(key))
      throw new Error(`Error on try overwrite instance [${key.toString()}]`);
    
    if (typeof key === 'string') {
      if (isSingleton)
        this._instances.set(key, args);
      else
        this._instances.set(key, () => args);
      
      return;
    }

    const _args = args ? { ... args } : []
    
    if (isSingleton)
      this._instances.set(key, new key(..._args));
    else
      this._instances.set(key, () => new key(...args));
  }

  public get<T, Args extends any[] = any[]>(key: TConstructor<T, Args> | string): T {
    const instance = this._instances.get(key);

    if (!instance)
      throw new Error(`Instance not found [${key.toString()}]`);

    return {} as T;
  }
}