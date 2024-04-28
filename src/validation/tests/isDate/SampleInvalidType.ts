import { Injectable } from '@zcodeapp/di'
import { IsDate } from '../../src'

@Injectable({ singleton: false })
export class SampleInvalidType {
  @IsDate()
  public default: number
}
