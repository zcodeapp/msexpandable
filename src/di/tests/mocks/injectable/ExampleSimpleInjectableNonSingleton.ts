import { Utils } from "@zcodeapp/utils";
import { Injectable } from "../../../src/injectable"

@Injectable({ singleton: false, providers: [() => Utils.RandomString(10)] })
export class ExampleSimpleInjectableNonSingleton {
  private _secret: string;
  public constructor(
    secret: () => string
  ) {
    this._secret = secret();
  }

  public getSecret() {
    return this._secret;
  }
}