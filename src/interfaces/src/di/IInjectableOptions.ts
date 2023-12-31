/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInjectableOptions<T = any, Y = any> {
  singleton?: boolean,
  args?: T,
  factory?: () => Y,
  value?: string
}