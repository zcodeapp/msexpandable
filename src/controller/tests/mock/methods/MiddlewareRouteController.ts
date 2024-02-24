import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head, BaseController } from "../../../src";
import { MiddlewareRouteDependency } from "./MiddlewareRouteDependency";
import { MiddlewareDependency } from "./MiddlewareDependency";

@Controller("/", {
  middlewares: [MiddlewareDependency]
})
export class MiddlewareRouteController extends BaseController implements IController {

  @Get("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public get() {}

  @Post("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public post() {}

  @Put("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public put() {}

  @Delete("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public delete() {}

  @Patch("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public patch() {}

  @Options("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public options() {}

  @Head("/", {
    middlewares: [MiddlewareRouteDependency]
  })
  public head() {}
}