import { Injectable } from "@zcodeapp/di";
import { IsNumber } from "../../src";

@Injectable({ singleton: false })
export class SampleMessagesDefault {

  @IsNumber({
    required: true
  })
  public _empty: number;

  @IsNumber()
  public _invalid1: string;

  @IsNumber()
  public _invalid2: number;
}