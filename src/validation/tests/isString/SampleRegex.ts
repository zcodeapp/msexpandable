import { Injectable } from "@zcodeapp/di";
import { IsString } from "../../src"

@Injectable({ singleton: false })
export class SampleRegex {
  
  @IsString({
    regex: /^[a-zA-Z]{2}$/
  })
  public default: string;
}