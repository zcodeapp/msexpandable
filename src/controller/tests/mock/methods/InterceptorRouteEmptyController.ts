import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head, BaseController } from "../../../src";
import { InterceptorRouteDependency } from "./InterceptorRouteDependency";

@Controller()
export class InterceptorRouteEmptyController extends BaseController implements IController {

  @Get("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public get() {}

  @Post("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public post() {}

  @Put("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public put() {}

  @Delete("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public delete() {}

  @Patch("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public patch() {}

  @Options("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public options() {}

  @Head("/", {
    interceptors: [InterceptorRouteDependency]
  })
  public head() {}
}