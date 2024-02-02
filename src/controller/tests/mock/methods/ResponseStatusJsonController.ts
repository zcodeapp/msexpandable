import { ERequestStatus, IController } from "@zcodeapp/interfaces";
import { Controller } from "../../../src";

@Controller("/", {
  responses: [
    {
      status: ERequestStatus.BAD_REQUEST,
    }
  ]
})
export class ResponseStatusJsonController implements IController {

}