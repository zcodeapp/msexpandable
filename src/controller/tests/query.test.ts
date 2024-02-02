import { Di } from "@zcodeapp/di";
import { EControllerMethod, IControllerManager } from "@zcodeapp/interfaces";
import { ControllerManager } from "../src";
import { QuerySampleController } from "./mock/query/QuerySampleController"

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Test Query", () => {

  const di = Di.getInstance();
  let controllerManager: IControllerManager;

  beforeEach(() => {
      controllerManager = di.get(ControllerManager);
  });

  it("Test Query with sample QuerySampleController", () => {
    const controller = controllerManager.getControllers().find(x => x.key == QuerySampleController.name.toLocaleLowerCase());
    const methods = controllerManager.getRoutes();
    const method = methods.find(x => {
      return x.key == QuerySampleController.name.toLocaleLowerCase()
        && x.method == EControllerMethod.GET
    });

    const _controller = di.get<any>(String(controller?.key))

    console.log("execute init")
    const execution = _controller.callMethod("get")
    console.log("execute end")

    console.log({
      _controller,
      method,
      execution
    })
  })
});