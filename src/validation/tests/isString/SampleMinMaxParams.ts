import { Injectable } from "@zcodeapp/di";
import { IsString } from "../../src"

@Injectable({ singleton: false })
export class SampleMinMaxParams {
  
  @IsString({
    min: 5,
    max: 7
  })
  public default: string;

  @IsString(0, 5, {
    required: false
  })
  public params: string;
}