import { Utils } from '@zcodeapp/utils'
import { Injectable } from '../../../src/injectable'

@Injectable({
  singleton: false,
  providers: [() => Utils.Strings.RandomString(10), () => 'fixed']
})
export class ExampleMultiInjectableNonSingleton {
  private _secretA: string
  private _secretB: string
  public constructor(secretA: () => string, secretB: () => string) {
    this._secretA = secretA()
    this._secretB = secretB()
  }

  public getSecretA() {
    return this._secretA
  }

  public getSecretB() {
    return this._secretB
  }
}
