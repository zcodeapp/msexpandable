import { Injectable } from "@zcodeapp/di";
import { IsUuid } from "../../src"

@Injectable({ singleton: false })
export class SampleDefaultValues {
  
  @IsUuid()
  public default: string;
}