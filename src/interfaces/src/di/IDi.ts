import { TConstructor } from "."

export interface IDi {
    register<T = any, Args extends any[] = any>(key: (TConstructor<T, Args> | string), args?: (Args | any), isSingleton?: boolean): void;
    get<T, Args extends any[] = any[]>(key: TConstructor<T, Args> | string): T;
}