import { ExampleSimpleString } from "./ExampleSimpleString";

export class ExampleSimpleInject {
  private _class: ExampleSimpleString;
  public constructor(
    __class: ExampleSimpleString
  ) {
    this._class = __class;
  }

  public getClass() {
    return this._class;
  }
}