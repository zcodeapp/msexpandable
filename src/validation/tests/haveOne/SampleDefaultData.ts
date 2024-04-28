import { Injectable } from '@zcodeapp/di'
import { IsDate, IsNumber, IsString } from '../../src'

@Injectable({ singleton: false })
export class SampleDefaultData {
  @IsDate({
    generate: true
  })
  public createdAt: Date

  @IsString({
    required: true
  })
  public name: string

  @IsNumber()
  public access?: number
}
