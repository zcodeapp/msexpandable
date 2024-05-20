import { Di, Injectable } from '@zcodeapp/di'
import {
  IValidation,
  IValidationResult,
  IValidationRules,
  IValidationStrategy
} from '@zcodeapp/interfaces'
import { Validation } from '../validation'
import { Logger } from '@zcodeapp/logger'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class HaveOneStrategy implements IValidationStrategy {
  constructor(
    private readonly _di: Di,
    private readonly _logger: Logger
  ) {}

  public handle(rule: IValidationRules, value: any): IValidationResult {
    const result: IValidationResult = {
      success: true,
      errors: []
    }

    try {
      if (rule.required) {
        if (typeof value !== 'object') {
          result.errors.push({
            constructor: rule.constructor,
            message:
              rule.errors?.invalid ??
              `This value needs to be a "${rule.model?.name ?? rule.signature.name}" object`,
            propertyName: rule.propertyName,
            value
          })
          throw new Error(
            `This value needs to be a "${rule.model?.name ?? rule.signature.name}" object`
          )
        }
      }

      if (
        value !== null &&
        value !== undefined &&
        value.constructor.name !== (rule.model?.name ?? rule.signature.name)
      ) {
        result.errors.push({
          constructor: rule.constructor,
          message:
            rule.errors?.invalid ??
            `This value needs to be a "${rule.model?.name ?? rule.signature.name}" object`,
          propertyName: rule.propertyName,
          value
        })
        throw new Error(
          `This value needs to be a "${rule.model?.name ?? rule.signature.name}" object`
        )
      }

      // recursion to validate the object
      const validation = Di.getInstance().get<IValidation>(Validation)
      const check = validation.check(value)

      if (check.errors && check.errors.length > 0) {
        check.errors.forEach((error) => {
          result.errors.push({
            constructor: rule.constructor,
            message: error.message,
            propertyName: `${rule.propertyName}.${error.propertyName}`,
            value: error.value
          })
        })
        throw new Error(
          `Error on try check instance rule "${rule.constructor}" on ${rule.propertyName}`
        )
      }
    } catch (err) {
      result.success = false
      this._logger.error(`Error on try check instance "${rule.constructor}"`, {
        err,
        rule,
        value
      })
    } finally {
      /* eslint-disable no-unsafe-finally */
      return result
    }
  }
}
