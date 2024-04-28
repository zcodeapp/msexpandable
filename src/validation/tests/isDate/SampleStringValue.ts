import { Injectable } from '@zcodeapp/di'
import { IsDate } from '../../src'

@Injectable({ singleton: false })
export class SampleStringValue {
  @IsDate()
  public dateString: Date
}
