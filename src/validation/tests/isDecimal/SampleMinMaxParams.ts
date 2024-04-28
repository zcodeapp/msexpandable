import { Injectable } from '@zcodeapp/di'
import { IsDecimal } from '../../src'

@Injectable({ singleton: false })
export class SampleMinMaxParams {
  @IsDecimal({
    min: 5,
    max: 7
  })
  public default: number

  @IsDecimal(0, 5, {
    required: false
  })
  public params: number
}
