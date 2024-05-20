import { Injectable } from '@zcodeapp/di'
import { HaveOne } from '../../src/decorators'
import { SampleDefaultData } from './SampleDefaultData'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: false })
export class SampleDefaultModelRequired {
  @HaveOne({
    required: true,
    model: SampleDefaultData
  })
  public default: any
}
