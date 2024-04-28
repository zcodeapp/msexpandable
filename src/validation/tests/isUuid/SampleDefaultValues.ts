import { Injectable } from '@zcodeapp/di'
import { IsUuid } from '../../src'

@Injectable({ singleton: false })
export class SampleDefaultValues {
  @IsUuid()
  public default: string

  @IsUuid({
    generate: true
  })
  public nonGenerate: string

  @IsUuid({
    generate: true,
    required: true
  })
  public generate: string

  @IsUuid({
    generate: true
  })
  public generateNonRequired: string

  @IsUuid(true)
  public generateBoolean: string
}
