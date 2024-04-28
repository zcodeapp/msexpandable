import {
  EValidationTypes,
  IValidation,
  IValidationOptions
} from '@zcodeapp/interfaces'
import { Validation } from '../validation'
import { Di } from '@zcodeapp/di'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Function for validation decorator default
 *
 * @param options Validation Options
 * @returns
 */
export function decoratorDefault(type: EValidationTypes) {
  return function (options?: IValidationOptions) {
    options = {
      ...(options ?? {})
    }

    return function (constructor: any, propertyName: any) {
      options = {
        ...options,
        constructor,
        propertyName
      }

      const di = Di.getInstance()
      const validation = di.get<IValidation>(Validation)

      validation.register(type, options)
    }
  }
}
