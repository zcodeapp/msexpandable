import { Di, Injectable } from "@zcodeapp/di";
import { IValidation, IValidationError, IValidationResult, IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";
import { Validation } from "../validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class HaveOneStrategy implements IValidationStrategy {

  constructor(
    private readonly _di: Di
  ){}

  public handle(rule: IValidationRules, value: any): IValidationResult {

    const result: IValidationResult = {
      success: false,
      errors: []
    };

    if (rule.required && (value == null || String(value) == "{}"))
      return result;
    
    const validation = Di.getInstance().get<IValidation>(Validation);
    let { errors } = validation.check(value);
    if (errors && errors.length > 0) {

      errors = errors.map(error => {
        error.constructor = rule.constructor;
        error.propertyName = `${rule.propertyName}.${error.propertyName}`;
        return error;
      });

      return {
        ...result,
        ...{
          errors
        }
      };
    }
    return {
      ...result,
      ... {
        success: true
      }
    };
  }
}