import { Injectable } from "@zcodeapp/di";
import { IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";
import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class UuidStrategy implements IValidationStrategy {

  public handle(rule: IValidationRules, value: any): boolean {

    if (String(value) == "" && rule.generate)
      value = Utils.Strings.Uuid();

    if (typeof value != "string")
      return false;

    const regex: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return regex.test(value);
  }
}