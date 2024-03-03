import { Injectable } from "@zcodeapp/di";
import { IsUuid } from "../../src"

@Injectable({ singleton: false })
export class SampleInvalidType {
  
  @IsUuid()
  public default: number;
}