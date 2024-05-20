import {
  EValidationTypes,
  IValidation,
  IValidationOptions,
  TConstructor
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
export function decoratorModel(type: EValidationTypes) {
  return function (
    model?: TConstructor<any> | IValidationOptions,
    options?: IValidationOptions
  ) {
    let _options = {
      ...options
    }

    if (model?.constructor && model.constructor.name !== 'Object') {
      _options = {
        ..._options,
        ...{
          model: model as any
        }
      }
    } else {
      if (model) {
        _options = {
          ..._options,
          ...model
        }
      }
    }

    return function (constructor: any, propertyName: any) {
      _options = {
        ..._options,
        constructor,
        propertyName
      }

      const di = Di.getInstance()
      const validation = di.get<IValidation>(Validation)

      validation.register(type, _options)
    }
  }
}
