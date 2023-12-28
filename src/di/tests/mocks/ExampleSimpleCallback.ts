export class ExampleSimpleCallback {
  private _content: () => string;
  public constructor(
    content: () => string
  ) {
    this._content = content;
  }

  public getContent() {
    return this._content();
  }
}