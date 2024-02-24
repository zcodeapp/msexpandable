import { IValidationRules } from "./IValidationRules";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationStrategy {
  handle(rule: IValidationRules, value: any): boolean;
}