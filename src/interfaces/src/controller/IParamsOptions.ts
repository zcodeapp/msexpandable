import { IFilterRules } from "../filter";
import { IValidationRules } from "../validation";

export interface IParamsOptions {
  field?: string;
  validation?: IValidationRules | IValidationRules[];
  filter?: IFilterRules | IFilterRules[];
}