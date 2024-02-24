import { Injectable } from "@zcodeapp/di";
import { IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class NumberStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): boolean {
    if (typeof value != "number" || isNaN(value) || value < rule.min || value > rule.max)
      return false;

    if (rule.regex)
      return rule.regex.test(value.toString());
      
    return true;
  }
}