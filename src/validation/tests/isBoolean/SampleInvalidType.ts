import { Injectable } from "@zcodeapp/di";
import { IsBoolean } from "../../src"

@Injectable({ singleton: false })
export class SampleInvalidType {
  
  @IsBoolean()
  public default: string;
}