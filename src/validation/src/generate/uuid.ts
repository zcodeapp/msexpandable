import { Injectable } from "@zcodeapp/di";
import { IValidationGenerate, IValidationRules } from "@zcodeapp/interfaces";
import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class UuidGenerate implements IValidationGenerate {

  public handle(rule: IValidationRules, value: any): any {

    if ((value == undefined || String(value) == "") && rule.generate)
      return Utils.Strings.Uuid();

    return value;
  }
}