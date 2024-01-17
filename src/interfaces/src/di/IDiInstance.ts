import { TConstructor } from ".";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDiInstance {
    key: TConstructor<any> | string,
    unique: string,
    singleton?: boolean,
    instance?: any,
    args?: any
  }