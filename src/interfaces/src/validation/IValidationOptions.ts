import { TConstructor } from "../di";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationOptions {
  constructor?: any;
  propertyName?: string;
  errors?: {
    empty?: string,
    invalid?: string
  },
  required?: boolean;
  min?: number;
  max?: number;
  decimal?: number;
  regex?: RegExp;
  generate?: boolean;
  model?: TConstructor<any>,
  singleModel?: boolean
}