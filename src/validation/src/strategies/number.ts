import { Injectable } from "@zcodeapp/di";
import { IValidationResult, IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class NumberStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): IValidationResult {

    const result: IValidationResult = {
      success: false,
      errors: []
    };

    if (typeof value != "number" || isNaN(value) || value < rule.min || value > rule.max)
      return result;

    if (rule.regex)
      return {
        ... result,
        ... {
          success: rule.regex.test(value.toString())
        }
      };
      
    return {
      ... result,
      ... {
        success: true
      }
    };
  }
}