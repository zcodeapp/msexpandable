import { EValidationTypes } from "./EValidationTypes";
import { IValidationRules } from "./IValidationRules";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationMapTypes {
  type: EValidationTypes,
  callback: (rule: IValidationRules, value: any) => boolean
}