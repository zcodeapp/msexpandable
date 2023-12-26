import { TConstructor } from ".";
export interface IDi {
    register<T, Args extends any[] = any[]>(key: TConstructor<T, Args>, isSingleton?: boolean, args?: Args): void;
    register<T, Args extends any = any>(key: string, isSingleton: boolean, args?: any): void;
    get<T, Args extends any[] = any[]>(key: TConstructor<T, Args> | string): T;
}
