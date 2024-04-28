import { Injectable } from '@zcodeapp/di'
import { IsNumber } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsNumber({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: number

  @IsNumber({
    errors: {
      invalid: 'Invalid string message'
    }
  })
  public _invalid1: string

  @IsNumber({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: number
}
