import { Injectable } from '@zcodeapp/di'
import { IsDate } from '../../src'

@Injectable({ singleton: false })
export class SampleMessages {
  @IsDate({
    required: true,
    errors: {
      empty: 'Empty message'
    }
  })
  public _empty: Date

  @IsDate({
    errors: {
      invalid: 'Invalid date message'
    }
  })
  public _invalid1: number

  @IsDate({
    errors: {
      invalid: 'Invalid content message'
    }
  })
  public _invalid2: string
}
