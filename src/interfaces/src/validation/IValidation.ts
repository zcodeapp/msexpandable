import { EValidationTypes } from './EValidationTypes'
import { IValidationCheckResult } from './IValidationCheckResult'
import { IValidationOptions } from './IValidationOptions'
import { IValidationRules } from './IValidationRules'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidation {
  register(type: EValidationTypes, options: IValidationOptions): void
  check(constructor: any): IValidationCheckResult
  exists(constructor: any): IValidationRules
}
