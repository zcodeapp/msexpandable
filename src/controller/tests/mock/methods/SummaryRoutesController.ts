import { IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head } from "../../../src"

@Controller()
export class SummaryRoutesController implements IController {
  @Get("/", {
    summary: "Get summary"
  })
  public get() {}

  @Post("/", {
    summary: "Post summary"
  })
  public post() {}

  @Put("/", {
    summary: "Put summary"
  })
  public put() {}

  @Delete("/", {
    summary: "Delete summary"
  })
  public delete() {}

  @Patch("/", {
    summary: "Patch summary"
  })
  public patch() {}

  @Options("/", {
    summary: "Options summary"
  })
  public options() {}

  @Head("/", {
    summary: "Head summary"
  })
  public head() {}
}