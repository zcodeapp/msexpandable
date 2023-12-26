export type TConstructor<T, Args extends any[] = any[]> = new (...args: Args) => T;
