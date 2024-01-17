import { Injectable } from "../../src/injectable"
import { ExampleComplexInjectable } from "./ExampleComplexInjectable";
import { ExampleSimpleInjectable } from "./ExampleSimpleInjectable";

@Injectable({ singleton: true })
export class ExampleComplexMultiInjectable {
  private _content: ExampleComplexInjectable;
  private _simple: ExampleSimpleInjectable;
  public constructor(
    __content: ExampleComplexInjectable,
    ___simple: ExampleSimpleInjectable
  ) {
    this._content = __content;
    this._simple = ___simple;
  }

  public getContent() {
    return this._content;
  }

  public getSimple() {
    return this._simple;
  }
}