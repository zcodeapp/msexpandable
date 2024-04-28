import { Injectable } from '@zcodeapp/di'
import {
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class StringStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: false,
      errors: []
    }

    if (
      typeof value != 'string' ||
      value.length < rule.min ||
      value.length > rule.max
    )
      return result

    if (rule.regex)
      return {
        ...result,
        ...{
          success: rule.regex.test(value)
        }
      }

    return {
      ...result,
      ...{
        success: true
      }
    }
  }
}
