/* eslint-disable @typescript-eslint/no-explicit-any */
export type TConstructor<T = any, Args extends any[] = any> = new (...args: Args) => T;