import { Injectable } from '@zcodeapp/di'
import {
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class UuidStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: false,
      errors: []
    }

    if (typeof value != 'string') return result

    const regex: RegExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

    return {
      ...result,
      ...{
        success: regex.test(value)
      }
    }
  }
}
