import { TConstructor } from "."

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDi {
    register<T = any, Args extends any[] = any>(key: (TConstructor<T, Args> | string), args?: (Args | any), isSingleton?: boolean): void;
    get<T = any, Args extends any[] = any[]>(key: TConstructor<T, Args> | string): T;
}