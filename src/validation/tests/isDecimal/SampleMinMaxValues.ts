import { Injectable } from "@zcodeapp/di";
import { IsDecimal } from "../../src"

@Injectable({ singleton: false })
export class SampleMinMaxValues {
  
  @IsDecimal(5, 7)
  public valueDefault: number;
  
  @IsDecimal(5, 7, {
    decimal: 2
  })
  public valueDecimal: number;
}