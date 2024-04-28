import { Injectable } from '@zcodeapp/di'
import { IsDecimal } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsDecimal({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: number

  @IsDecimal({
    errors: {
      invalid: 'Invalid string message'
    }
  })
  public _invalid1: string

  @IsDecimal({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: number
}
