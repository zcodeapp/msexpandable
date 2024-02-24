import { Injectable } from "@zcodeapp/di";
import { IsNumber } from "../../src"

@Injectable({ singleton: false })
export class SampleDefaultValues {
  
  @IsNumber()
  public default: number;
}