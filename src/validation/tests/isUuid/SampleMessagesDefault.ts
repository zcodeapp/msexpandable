import { Injectable } from "@zcodeapp/di";
import { IsUuid } from "../../src";

@Injectable({ singleton: false })
export class SampleMessagesDefault {

  @IsUuid({
    required: true
  })
  public _empty: string;

  @IsUuid()
  public _invalid1: number;

  @IsUuid()
  public _invalid2: string;
}