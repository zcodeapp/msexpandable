/* eslint-disable @typescript-eslint/no-explicit-any */
export type TConstructor<T, Args extends any[] = any[]> = new (...args: Args) => T;