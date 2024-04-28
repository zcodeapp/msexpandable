import { Injectable } from '@zcodeapp/di'
import { IsBoolean } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsBoolean({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: boolean

  @IsBoolean({
    errors: {
      invalid: 'Invalid string message'
    }
  })
  public _invalid1: string

  @IsBoolean({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: boolean
}
