import { Injectable } from "@zcodeapp/di";
import { IValidationRules, IValidationStrategy } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: true })
export class BooleanStrategy implements IValidationStrategy {
  public handle(rule: IValidationRules, value: any): boolean {
    if (typeof value != "boolean") {
      return false;
    }
    return true;
  }
}