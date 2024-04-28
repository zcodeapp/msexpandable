import { TConstructor } from './TConstructor'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDiGetOptionsProviders {
  class: TConstructor<any>
  factory: () => any
}
