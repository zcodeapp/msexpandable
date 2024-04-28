import { Injectable } from '@zcodeapp/di'
import { IsNumber } from '../../src'

@Injectable({ singleton: false })
export class SampleMinMaxParams {
  @IsNumber({
    min: 5,
    max: 7
  })
  public default: number

  @IsNumber(0, 5, {
    required: false
  })
  public params: number
}
