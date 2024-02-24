import { Injectable } from "@zcodeapp/di";
import { IsString } from "../../src"

@Injectable({ singleton: false })
export class SampleMinMaxValues {
  
  @IsString(5, 7)
  public default: string;
}