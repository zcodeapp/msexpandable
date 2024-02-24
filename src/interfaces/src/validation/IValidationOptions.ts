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
  regex?: RegExp;
  generate?: boolean;
}