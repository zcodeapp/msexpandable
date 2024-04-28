import { Injectable } from '@zcodeapp/di'
import {
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class DateStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: false,
      errors: []
    }

    if (value != undefined && String(value) != '' && value instanceof Date) {
      try {
        const date: string = value?.toISOString() ?? ''
        const regex =
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/
        return {
          ...result,
          ...{
            success: regex.test(date)
          }
        }
      } catch {
        return result
      }
    }

    return result
  }
}
