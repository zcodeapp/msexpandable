import { Injectable } from '@zcodeapp/di'
import { IsNumber } from '../../src'

@Injectable({ singleton: false })
export class SampleRegex {
  @IsNumber({
    regex: /[0-9]{2}/
  })
  public default: number
}
