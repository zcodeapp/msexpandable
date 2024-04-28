import { Injectable } from '@zcodeapp/di'
import { IsDate } from '../../src'

@Injectable({ singleton: false })
export class SampleDefaultValues {
  @IsDate()
  public default: Date

  @IsDate({
    generate: true
  })
  public nonGenerate: Date

  @IsDate({
    generate: true,
    required: true
  })
  public generate: Date

  @IsDate({
    generate: true
  })
  public generateNonRequired: Date

  @IsDate(true)
  public generateBoolean: Date
}
