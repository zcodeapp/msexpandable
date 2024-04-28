import { Injectable } from '@zcodeapp/di'
import { IsString } from '../../src'

@Injectable({ singleton: false })
export class SampleDefaultValues {
  @IsString()
  public default: string
}
