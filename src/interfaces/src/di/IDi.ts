import { TConstructor } from "."

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IDi {
    // register<T>(classType: TConstructor<T>, args?: IInjectableOptions): void
    // get<T>(classType: TConstructor<T> | string): T
    register<T = any, Args extends any[] = any>(key: (TConstructor<T, Args> | string), args?: (Args | any), isSingleton?: boolean): void;
    get<T, Args extends any[] = any[]>(key: TConstructor<T, Args> | string): T;
}