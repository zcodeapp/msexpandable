import { Di } from "@zcodeapp/di";
import { TConstructor, IControllerOptions, IController } from "@zcodeapp/interfaces";
import { ControllerManager } from "./controllerManager";

export function Controller(path?: string, options?: IControllerOptions) {
  return function(constructor: TConstructor<IController>) {
    const di = Di.getInstance();
    const controllerManager = di.get(ControllerManager);
    controllerManager.register(constructor, { ...{ path: path ?? "/" }, ...options});
  };
}