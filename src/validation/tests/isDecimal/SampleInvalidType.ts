import { Injectable } from '@zcodeapp/di'
import { IsDecimal } from '../../src'

@Injectable({ singleton: false })
export class SampleInvalidType {
  @IsDecimal()
  public default: string
}
