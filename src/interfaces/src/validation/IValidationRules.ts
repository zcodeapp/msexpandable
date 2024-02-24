import { EValidationTypes } from "./EValidationTypes";
import { IValidationOptions } from "./IValidationOptions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationRules extends IValidationOptions {
  type: EValidationTypes;
}
