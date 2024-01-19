import { IDiConstructor, IDiOptions, TConstructor } from "."

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDi {
    updateOptions(_options: IDiConstructor): void;
    provider<T = any>(key: TConstructor<T>, providers: any[]): void;
    register<T = any>(key: (TConstructor<T> | string), options?: IDiOptions): void;
    get<T = any>(key: TConstructor<T> | string): T;
}