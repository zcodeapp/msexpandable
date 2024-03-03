import { Injectable } from "@zcodeapp/di";
import { IsDecimal } from "../../src";

@Injectable({ singleton: false })
export class SampleMessagesDefault {

  @IsDecimal({
    required: true
  })
  public _empty: number;

  @IsDecimal()
  public _invalid1: string;

  @IsDecimal()
  public _invalid2: number;
}