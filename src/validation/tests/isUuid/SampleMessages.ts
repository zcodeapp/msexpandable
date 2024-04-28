import { Injectable } from '@zcodeapp/di'
import { IsUuid } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsUuid({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: string

  @IsUuid({
    errors: {
      invalid: 'Invalid uuid message'
    }
  })
  public _invalid1: number

  @IsUuid({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: string
}
