import { ERequestStatus, IController } from "@zcodeapp/interfaces";
import { Controller } from "../../../src";
import { HttpRequest } from "@zcodeapp/http-request";

@Controller("/", {
  responses: [
    {
      status: ERequestStatus.BAD_REQUEST,
      json: HttpRequest
    }
  ]
})
export class ResponseStatusJsonController implements IController {

}