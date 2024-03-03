import { EValidationTypes } from "./EValidationTypes";
import { IValidationResult } from "./IValidationResult";
import { IValidationRules } from "./IValidationRules";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationMapTypes {
  type: EValidationTypes,
  callback: (rule: IValidationRules, value: any) => IValidationResult,
  generate?: (rule: IValidationRules, value: any) => any,
  parse?: (rule: IValidationRules, value: any) => any,
}