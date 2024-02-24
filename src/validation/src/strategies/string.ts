import { Injectable } from "@zcodeapp/di";
import { IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class StringStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): boolean {
    if (typeof value != "string" || value.length < rule.min || value.length > rule.max)
      return false;

    if (rule.regex)
      return rule.regex.test(value);
    
    return true;
  }
}