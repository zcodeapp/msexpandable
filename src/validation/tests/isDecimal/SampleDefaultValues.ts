import { Injectable } from "@zcodeapp/di";
import { IsDecimal } from "../../src"

@Injectable({ singleton: false })
export class SampleDefaultValues {
  
  @IsDecimal()
  public valueDefault: number;
  
  @IsDecimal({
    decimal: 2
  })
  public valueDecimal: number;
}