import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head } from "../../../src";

@Controller("/routePath")
export class RoutePathMethodsController implements IController {

  @Get("/get")
  public get() {}

  @Post("/post")
  public post() {}

  @Put("/put")
  public put() {}

  @Delete("/delete")
  public delete() {}

  @Patch("/patch")
  public patch() {}

  @Options("/options")
  public options() {}

  @Head("/head")
  public head() {}
}