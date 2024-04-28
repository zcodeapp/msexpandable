import { Injectable } from '@zcodeapp/di'
import { IValidationParse, IValidationRules } from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class DateParse implements IValidationParse {
  public handle(rule: IValidationRules, value: any): Date {
    if (typeof value == 'string') {
      const regex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/
      if (regex.test(value)) {
        return new Date(value)
      }
    }

    return value
  }
}
