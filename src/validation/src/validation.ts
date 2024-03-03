import "reflect-metadata";
import { Di, Injectable } from "@zcodeapp/di";
import { Logger } from "@zcodeapp/logger";
import {
  EValidationMap,
  EValidationTypes,
  IValidation,
  IValidationCheckResult,
  IValidationError,
  IValidationMapTypes,
  IValidationOptions,
  IValidationRules
} from "@zcodeapp/interfaces";
import { NumberStrategy } from "./strategies/number";
import { StringStrategy } from "./strategies/string";
import { BooleanStrategy } from "./strategies/boolean";
import { UuidStrategy } from "./strategies/uuid";
import { UuidGenerate } from "./generate/uuid";
import { DateStrategy } from "./strategies/date";
import { DateGenerate } from "./generate/date";
import { DateParse } from "./parser/date";
import { DecimalStrategy } from "./strategies/decimal";
import { HaveOneStrategy } from "./strategies/haveOne";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
@Injectable({ singleton: true })
export class Validation implements IValidation {

  /**
   * Strategies for validation
   */
  private readonly _strategies = [
    // TYPE                     STRATEGY          GENERATE          PARSE
    [EValidationTypes.NUMBER,   NumberStrategy                                ],
    [EValidationTypes.DECIMAL,  DecimalStrategy,                              ],
    [EValidationTypes.STRING,   StringStrategy                                ],
    [EValidationTypes.BOOLEAN,  BooleanStrategy                               ],
    [EValidationTypes.UUID,     UuidStrategy,     UuidGenerate                ],
    [EValidationTypes.DATE,     DateStrategy,     DateGenerate,     DateParse ],
    [EValidationTypes.HAVE_ONE, HaveOneStrategy                                 ]
  ];

  /**
   * Rules for classes
   */
  private _rules: IValidationRules[] = [];

  /**
   * Method for construct instance of Validation
   *
   * @param _di Instance of Di
   * @param _logger Instance of Logger
   */
  constructor(
    private readonly _di: Di,
    private readonly _logger: Logger
  ){
    this._logger.addPrefix("[Validation]");
  }

  /**
   * Method for register class/property for validation
   *
   * @param type Type of value
   * @param options Options for validate
   */
  public register(type: EValidationTypes, options: IValidationOptions): void {
    this._logger.debug("Register constructor/property validation", {
      type,
      options
    });
    this._rules.push({
      ... options,
      type,
      constructor: options.constructor.constructor.name,
      signature: Reflect.getMetadata("design:type", options.constructor, options.propertyName)
    });
  }

  /**
   * Method for get if exists validation
   *
   * @param constructor Contructor for test exists
   * @returns 
   */
  public exists(constructor: any): IValidationRules {
    return this._rules.find(x => x.constructor == (constructor.prototype.constructor?.name ?? constructor.constructor.name));
  }

  /**
   * Method for validate class using decorators
   * 
   * @param constructor Contructor for validate
   * @returns Errors if exists
   */
  public check(constructor: any): IValidationCheckResult {
    this._logger.debug("Check constructor", {
      constructor
    });
    
    const errors: IValidationError[] = [];

    const rules = this._rules.filter(x => x.constructor == constructor.constructor.name);

    this._logger.debug("Rules for class", {
      rules,
      constructor: constructor.constructor.name
    });

    if (rules.length > 0) {
      rules.forEach(rule => {
        let value = constructor[rule.propertyName];

        this._logger.debug("Value property", {
          constructor,
          value
        });

        if ((value == undefined || String(value) == "") && !rule.generate) {
          if (rule.required) {
            errors.push(this._error(rule, rule.errors?.empty ?? "Class have property required without value", value));
          }
        } else {
          this._strategies.map((_strategy: any) => {
            const strategy: IValidationMapTypes = {
              type: _strategy[EValidationMap.TYPE],
              callback: this._di.get<any>(_strategy[EValidationMap.STRATEGY]).handle,
              generate: _strategy[EValidationMap.GENERATE] && this._di.get<any>(_strategy[EValidationMap.GENERATE])?.handle,
              parse: _strategy[EValidationMap.PARSE] && this._di.get<any>(_strategy[EValidationMap.PARSE])?.handle
            };
            if (strategy.type == rule.type) {
              if (strategy.parse)
                value = constructor[rule.propertyName] = strategy.parse(rule, value)

              if (strategy.generate && rule.generate)
                value = constructor[rule.propertyName] = strategy.generate(rule, value)
  
              const resultCallback = strategy.callback(rule, value);

              if(resultCallback.errors && resultCallback.errors.length > 0) {
                resultCallback.errors.map(error => errors.push(error))
              } else {
                if (!resultCallback.success) {
                  errors.push(this._error(rule, rule.errors?.invalid ?? "Class have invalid value", value));
                }
              }
            }
          });
        }
      });

      return { errors };
    }
  }

  /**
   * Method for return error on try validate class
   *
   * @param rule Rule with error
   * @param message Error message
   * @param value Error value
   * @returns Validation error object
   */
  private _error(rule: IValidationRules, message: string, value: any): IValidationError {
    this._logger.warn(message, {
      constructor: rule.constructor,
      propertyName: rule.propertyName,
      value,
    });
    return {
      message: rule.errors?.invalid ?? message,
      constructor: rule.constructor,
      propertyName: rule.propertyName,
      value
    };
  }
}
