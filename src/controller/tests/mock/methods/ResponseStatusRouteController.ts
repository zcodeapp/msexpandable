import { ERequestStatus, IController } from "@zcodeapp/interfaces";
import { Controller, Get, Post, Put, Delete, Patch, Options, Head, BaseController } from "../../../src";

@Controller()
export class ResponseStatusRouteController extends BaseController implements IController {
  @Get("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example get error 400"
      }
    ]
  })
  public get() {}

  @Post("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example post error 400"
      }
    ]
  })
  public post() {}

  @Put("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example put error 400"
      }
    ]
  })
  public put() {}

  @Delete("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example delete error 400"
      }
    ]
  })
  public delete() {}

  @Patch("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example patch error 400"
      }
    ]
  })
  public patch() {}

  @Options("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example options error 400"
      }
    ]
  })
  public options() {}

  @Head("/", {
    responses: [
      {
        status: ERequestStatus.BAD_REQUEST,
        description: "Example head error 400"
      }
    ]
  })
  public head() {}
}