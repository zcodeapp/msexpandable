import { Logger } from "@zcodeapp/logger";
import { Di, Injectable } from "../../../src";

@Injectable()
export class ExampleInjectDiLogger {
  constructor(
    private readonly _di: Di,
    private readonly _logger: Logger
  ){}

  public getDi() {
    return this._di;
  }

  public getLogger() {
    return this._logger;
  }
}