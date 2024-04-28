/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInjectableOptions<T = any> {
  singleton?: boolean
  args?: T
}
