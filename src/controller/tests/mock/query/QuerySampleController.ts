import { EControllerInjectParam, IController, IControllerInjectParams } from "@zcodeapp/interfaces";
import { Controller, Get, Query, Body } from "../../../src";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Controller()
export class QuerySampleController implements IController {
  @Get()
  public get(
    @Query() query: any,
    @Query("country") country: string,
    @Query("name") name: string,
    @Query("age") age: string,
    @Body() body: any,
    @Body("seconds") seconds: string,
    @Body("example") example: string
  ) {
    return {
      query,
      country,
      name,
      age,
      body,
      seconds,
      example
    };
  }

  public callMethod(method: string) {
    
    const queryParams = {"name": "Example Name", "age": "37", "country": "BR"};
    const body = {"example": "Data", "seconds": "37"};

    const params: IControllerInjectParams[] = [
      ... Reflect.getMetadata("method:params", this, method) ?? []
    ];

    params.sort((a, b) => a.index - b.index);

    const args: any[] = [];
    params.map(query => {
      if(query.param == EControllerInjectParam.QUERY) {
        if (query?.value)
          return args.push(queryParams[query.value]);
  
        return args.push(queryParams);
      }
      if(query.param == EControllerInjectParam.BODY) {
        if (query?.value)
          return args.push(body[query.value]);
  
        return args.push(body);
      }
    });
    return this[method](...args);
  }
}