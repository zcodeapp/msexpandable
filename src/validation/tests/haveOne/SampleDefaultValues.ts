import { Injectable } from '@zcodeapp/di'
import { HaveOne } from '../../src/decorators'
import { SampleDefaultData } from './SampleDefaultData'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: false })
export class SampleDefaultValues {
  @HaveOne({
    required: true
  })
  public default: SampleDefaultData

  @HaveOne()
  public nonRequired: SampleDefaultData

  @HaveOne(SampleDefaultData)
  public modelConfig: any
}
