import { EControllerMethod, IControllerManager } from "@zcodeapp/interfaces";
import { Di } from "@zcodeapp/di";
// import { Logger, LoggerStrategyConsole } from "@zcodeapp/logger";
import { ControllerManager } from "../src/controllerManager";
// import { Get } from "../src"
// import { SampleController } from "./mock/controllerManager/sampleController";
import { SampleControllerMethods } from "./mock/methods/SampleControllerMethods";

describe("Methods test", () => {

    const di = Di.getInstance();
    // let _controller = [SampleControllerMethods];
    let controllerManager: IControllerManager;

    beforeEach(() => {
        controllerManager = di.get(ControllerManager);
    });

    it("Test populate route controller using SampleControllerMethods", () => {
      [
        {
          method: EControllerMethod.GET,
          route: "/sampleExample/list"
        },
        {
          method: EControllerMethod.POST,
          route: "/sampleExample/create"
        },
        {
          method: EControllerMethod.PUT,
          route: "/sampleExample/edit"
        },
        {
          method: EControllerMethod.DELETE,
          route: "/sampleExample/remove"
        }
      ].map(item => {
        const controller = controllerManager.getControllers().find(x => x.key == SampleControllerMethods.name.toLocaleLowerCase());
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == SampleControllerMethods.name.toLocaleLowerCase()
            && x.method == item.method
        });
        expect(`${controller?.options?.path}${method?.path}`).toBe(item.route);
      });
    });
});