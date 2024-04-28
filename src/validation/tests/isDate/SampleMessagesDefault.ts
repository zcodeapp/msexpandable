import { Injectable } from '@zcodeapp/di'
import { IsDate } from '../../src'

@Injectable({ singleton: false })
export class SampleMessagesDefault {
  @IsDate({
    required: true
  })
  public _empty: Date

  @IsDate()
  public _invalid1: number

  @IsDate()
  public _invalid2: string
}
