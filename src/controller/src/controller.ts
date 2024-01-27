import { Di } from "@zcodeapp/di";
import { TConstructor, IControllerOptions, IController } from "@zcodeapp/interfaces";
import { ControllerManager } from "./controllerManager";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Controller(_path?: string, _options?: IControllerOptions): any {
  return function(constructor: TConstructor<IController>) {
    const di = Di.getInstance();
    const controllerManager = di.get(ControllerManager);
    controllerManager.register(constructor, { ...{ path: _path ?? "/" }, ..._options});
  };
}