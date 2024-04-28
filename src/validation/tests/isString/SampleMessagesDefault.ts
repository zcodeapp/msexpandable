import { Injectable } from '@zcodeapp/di'
import { IsString } from '../../src'

@Injectable({ singleton: false })
export class SampleMessagesDefault {
  @IsString({
    required: true
  })
  public _empty: string

  @IsString()
  public _invalid1: number

  @IsString()
  public _invalid2: string
}
