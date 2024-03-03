import { EValidationTypes, IValidation, IValidationOptions, TConstructor } from "@zcodeapp/interfaces";
import { Validation } from "../validation";
import { Di } from "@zcodeapp/di";

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Function for validation decorator default
 *
 * @param options Validation Options
 * @returns 
 */
export function decoratorModel(type: EValidationTypes) {
    return function(model?: TConstructor<any> | IValidationOptions, options?: IValidationOptions) {
      options = {
        ... options ?? {},
        ... {
          singleModel: true
        }
      };

      if (model?.constructor && model?.constructor?.name != "Object") {
        options = {
          ... options,
          ... {
            model: model as any
          }
        };
      } else {
        if (model) {
          options = {
            ... options,
            ... model
          };
        }
      }
    
      return function(constructor: any, propertyName: any) {
        
        options = {
          ... options,
          constructor,
          propertyName
        };
        
        const di = Di.getInstance();
        const validation = di.get<IValidation>(Validation);
    
        validation.register(type, options);
      };
    }
  }