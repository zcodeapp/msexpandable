import { EControllerMethod, IController, IRequestData } from "@zcodeapp/interfaces";
import { Controller, Get, Query, BaseController, ControllerRequest, ControllerResponse } from "../../../src";
import "reflect-metadata";
import { Di } from "@zcodeapp/di";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Controller()
export class QueryReturnJsonController extends BaseController implements IController {

  static getQuery() {
    return [{
      name: "partner",
      value: "1234567890"
    },{
      name: "country",
      value: "BRA"
    }]
  }

  @Get()
  public get(
    @Query() query,
    @Query("partner") partner: string,
    @Query("country") country: string
  ) {
    return this._response.json({
      partner,
      country,
      query
    });
  }
}