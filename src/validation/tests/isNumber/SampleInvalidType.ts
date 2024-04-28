import { Injectable } from '@zcodeapp/di'
import { IsNumber } from '../../src'

@Injectable({ singleton: false })
export class SampleInvalidType {
  @IsNumber()
  public default: string
}
