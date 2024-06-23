import { Injectable } from '@zcodeapp/di'
import { HaveOne } from '../../src'
import { SampleDefaultData } from './SampleDefaultData'

@Injectable({ singleton: false })
export class SampleMessages {
  @HaveOne({
    required: true,
    errors: {
      empty: 'Empty message',
      invalid: 'Invalid message'
    }
  })
  public default: SampleDefaultData

  @HaveOne({
    required: false,
    errors: {
      empty: 'Empty message non-required',
      invalid: 'Invalid message non-required'
    }
  })
  public NonRequired: SampleDefaultData
}
