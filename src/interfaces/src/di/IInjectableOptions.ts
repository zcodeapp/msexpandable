/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInjectableOptions<T extends any[] = any[]> {
  singleton?: boolean,
  args?: T
}