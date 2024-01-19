import { Injectable } from "../../../src"
import { ExampleComplexInjectableNotInjected } from ".";

@Injectable({ singleton: true })
export class ExampleComplexInjectableNotFoundSingleton {
  private _content: ExampleComplexInjectableNotInjected;
  public constructor(
    __content: ExampleComplexInjectableNotInjected
  ) {
    this._content = __content;
  }
}