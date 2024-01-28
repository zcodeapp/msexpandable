import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head } from "../../../src";
import { MiddlewareRouteDependency } from "./MiddlewareRouteDependency";

@Controller()
export class MiddlewareRouteEmptyController implements IController {

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