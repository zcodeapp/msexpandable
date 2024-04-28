import { Injectable } from '@zcodeapp/di'
import { IsString } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsString({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: string

  @IsString({
    errors: {
      invalid: 'Invalid number message'
    }
  })
  public _invalid1: number

  @IsString({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: string
}
