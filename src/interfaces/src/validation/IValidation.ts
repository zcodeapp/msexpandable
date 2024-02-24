import { EValidationTypes } from "./EValidationTypes";
import { IValidationOptions } from "./IValidationOptions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidation {
  register(type: EValidationTypes, options: IValidationOptions);
  check(constructor: any);
}