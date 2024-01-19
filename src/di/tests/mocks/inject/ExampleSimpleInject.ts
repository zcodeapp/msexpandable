import { Injectable } from "../../../src"

@Injectable({ singleton: true, providers: ["content", 12345] })
export class ExampleSimpleInject {
  private _content: string;
  private _second: number;
  public constructor(
    __content: string,
    __second: number
  ) {
    this._content = __content;
    this._second = __second;
  }

  public getContent() {
    return this._content;
  }

  public getSecond() {
    return this._second;
  }
}