import { IController } from "@zcodeapp/interfaces";
import { Controller } from "../../../src/controller";
import { Get, Post, Put, Delete } from "../../../src/methods"

@Controller("/sampleExample")
export class SampleControllerMethods implements IController {

  @Get("/list")
  public list() {}

  @Post("/create")
  public create() {}

  @Put("/edit")
  public edit() {}

  @Delete("/remove")
  public remove() {}
}