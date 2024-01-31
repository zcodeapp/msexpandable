
import { IController } from "@zcodeapp/interfaces";
import { Controller } from "../../../src"

@Controller("/", {
  summary: "Controller summary"
})
export class SummaryController implements IController {

}