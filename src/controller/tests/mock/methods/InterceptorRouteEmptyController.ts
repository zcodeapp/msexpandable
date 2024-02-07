import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head } from "../../../src";
import { InterceptorRouteDependency } from "./InterceptorRouteDependency";

@Controller()
export class InterceptorRouteEmptyController implements IController {

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