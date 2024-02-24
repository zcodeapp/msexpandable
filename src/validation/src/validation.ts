import { Injectable } from "@zcodeapp/di";
import { Logger } from "@zcodeapp/logger";
import {
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
@Injectable({ singleton: true })
export class Validation implements IValidation {

  /**
   * Strategies for validation
   */
  private readonly _strategies: IValidationMapTypes[] = [
    {
      type: EValidationTypes.NUMBER,
      callback: this._numberStrategy.handle
    },
    {
      type: EValidationTypes.STRING,
      callback: this._stringStrategy.handle
    },
    {
      type: EValidationTypes.BOOLEAN,
      callback: this._booleanStrategy.handle
    },
    {
      type: EValidationTypes.UUID,
      callback: this._uuidStrategy.handle
    }
  ];

  /**
   * Rules for classes
   */
  private _rules: IValidationRules[] = [];

  /**
   * Method for construct instance of Validation
   *
   * @param _numberStrategy Number strategy
   * @param _stringStrategy String strategy
   * @param _booleanStrategy Boolean strategy
   * @param _uuidStrategy Uuid strategy
   * @param _logger Instance of Logger
   */
  constructor(
    private readonly _numberStrategy: NumberStrategy,
    private readonly _stringStrategy: StringStrategy,
    private readonly _booleanStrategy: BooleanStrategy,
    private readonly _uuidStrategy: UuidStrategy,
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
  public register(type: EValidationTypes, options: IValidationOptions) {
    this._logger.debug("Register constructor/property validation", {
      type,
      options
    });
    this._rules.push({
      ... options,
      type,
      constructor: options.constructor.constructor.name
    });
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
      rules.map(rule => {
        const value = constructor[rule.propertyName];

        this._logger.debug("Value property", {
          constructor,
          value
        });

        if (value == undefined) {
          if (rule.required) {
            errors.push(this._error(rule, rule.errors?.empty ?? "Class have property required without value", value));
          }
        } else {
          this._strategies.map(strategy => {
            if (strategy.type == rule.type) {
              if(!strategy.callback(rule, value)) {
                errors.push(this._error(rule, rule.errors?.invalid ?? "Class have invalid value", value));
              }
            }
          })
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
