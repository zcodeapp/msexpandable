import { Injectable } from "@zcodeapp/di";
import { HaveOne } from "../../src/decorators"
import { SampleDefaultData } from "./SampleDefaultData";

@Injectable({ singleton: false })
export class SampleDefaultValues {
  
  @HaveOne({
    required: true
  })
  public default: SampleDefaultData;
}