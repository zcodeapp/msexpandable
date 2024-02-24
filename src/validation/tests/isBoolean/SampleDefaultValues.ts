import { Injectable } from "@zcodeapp/di";
import { IsBoolean } from "../../src"

@Injectable({ singleton: false })
export class SampleDefaultValues {
  
  @IsBoolean()
  public default: boolean;
}