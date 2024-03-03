import { Injectable } from "@zcodeapp/di";
import { IValidationGenerate, IValidationRules } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class DateGenerate implements IValidationGenerate {

  public handle(rule: IValidationRules, value: any): any {

    if ((value == undefined || String(value) == "") && rule.generate)
      return new Date();

    return value;
  }
}