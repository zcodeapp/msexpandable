import { Injectable } from "@zcodeapp/di";
import { IsNumber } from "../../src"

@Injectable({ singleton: false })
export class SampleMinMaxValues {
  
  @IsNumber(5, 7)
  public default: number;
}