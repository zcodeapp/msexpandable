import { Injectable } from "../../src/injectable"
import { ExampleSimpleInjectable } from "./ExampleSimpleInjectable";

@Injectable({ singleton: true })
export class ExampleComplexInjectable {
  private _content: ExampleSimpleInjectable;
  public constructor(
    __content: ExampleSimpleInjectable
  ) {
    this._content = __content;
  }

  public getContent() {
    return this._content;
  }
}