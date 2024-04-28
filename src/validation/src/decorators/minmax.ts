import {
  EValidationTypes,
  IValidation,
  IValidationOptions
} from '@zcodeapp/interfaces'
import { Validation } from '../validation'
import { Di } from '@zcodeapp/di'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Function for validation decorator min/max
 *
 * @param min Min length
 * @param max Max length
 * @param options Validation Options
 * @returns
 */
export function decoratorMinMax(type: EValidationTypes) {
  return function (
    min?: number | IValidationOptions,
    max?: number,
    options?: IValidationOptions
  ) {
    options = {
      ...(options ?? {}),
      min: 0,
      max: 255
    }

    if (typeof min == 'number' && min > 0) options = { ...options, ...{ min } }

    if (typeof min == 'object') options = { ...options, ...min }

    if (typeof max == 'number' && max > 0) options = { ...options, ...{ max } }

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
