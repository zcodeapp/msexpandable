import { Injectable } from '@zcodeapp/di'
import { IsString } from '../../src'

@Injectable({ singleton: false })
export class SampleInvalidType {
  @IsString()
  public default: number
}
