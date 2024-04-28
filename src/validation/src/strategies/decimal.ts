import { Injectable } from '@zcodeapp/di'
import {
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class DecimalStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: false,
      errors: []
    }

    if (
      typeof value != 'number' ||
      isNaN(value) ||
      value < rule.min ||
      value > rule.max
    )
      return result

    if (rule?.decimal) {
      const rawNumber = value.toString().split('.')
      if (rawNumber.length != 2 || rawNumber[1].length > rule.decimal)
        return result
    }

    return {
      ...result,
      ...{
        success: true
      }
    }
  }
}
