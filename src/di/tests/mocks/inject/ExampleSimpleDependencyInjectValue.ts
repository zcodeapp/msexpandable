import { Inject } from '../../../src'
import { Injectable } from '../../../src'

@Injectable()
export class ExampleSimpleDependencyInjectValue {
  @Inject('dependency-value')
  private _value: string

  public getValue(): string {
    return this._value
  }
}
