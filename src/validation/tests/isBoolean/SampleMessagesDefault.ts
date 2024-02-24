import { Injectable } from "@zcodeapp/di";
import { IsBoolean } from "../../src";

@Injectable({ singleton: false })
export class SampleMessagesDefault {

  @IsBoolean({
    required: true
  })
  public _empty: boolean;

  @IsBoolean()
  public _invalid1: string;

  @IsBoolean()
  public _invalid2: boolean;
}