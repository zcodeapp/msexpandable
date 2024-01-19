import { ExampleSimpleCallback } from ".";

export class ExampleSimpleCallbackInject {
  private _class: ExampleSimpleCallback;
  public constructor(
    __class: ExampleSimpleCallback
  ) {
    this._class = __class;
  }

  public getClass() {
    return this._class;
  }
}