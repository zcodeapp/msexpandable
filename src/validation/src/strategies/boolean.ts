import { Injectable } from '@zcodeapp/di'
import {
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class BooleanStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: false,
      errors: []
    }

    if (typeof value != 'boolean') {
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
