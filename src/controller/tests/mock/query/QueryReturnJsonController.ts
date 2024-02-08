import { IController, IRequestQuery } from "@zcodeapp/interfaces";
import { Controller, Get, Query, BaseController, ControllerResponse, ControllerRequest } from "../../../src";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Controller()
export class QueryReturnJsonController extends BaseController implements IController {

  constructor(
    request: ControllerRequest,
    response: ControllerResponse
  ){
    super(request, response);
  }

  static getQuery(): IRequestQuery[] {
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