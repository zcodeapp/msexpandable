import { Di } from "@zcodeapp/di";
import { ControllerManager } from "./controllerManager";
import {
  // TConstructor,
  // IController,
  IControllerRouteOptions,
  EControllerMethod,
  // TConstructor
} from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
function createMethodDecorator(method: EControllerMethod) {
  return function(_path?: string, _options?: IControllerRouteOptions, _a?: any, _b?: any) {
    return function(constructor: any, propertyName: any, propertyDescriptor?: PropertyDescriptor) {
      const di = Di.getInstance();
      const controllerManager = di.get(ControllerManager);
      controllerManager.register(constructor.constructor);
      controllerManager.routes(constructor.constructor, propertyName, propertyDescriptor, { ...{ path: _path ?? "/", method }, ..._options ?? {} });
    };
  }
}

export const Get     = createMethodDecorator(EControllerMethod.GET);
export const Post    = createMethodDecorator(EControllerMethod.POST);
export const Put     = createMethodDecorator(EControllerMethod.PUT);
export const Delete  = createMethodDecorator(EControllerMethod.DELETE);
export const Patch   = createMethodDecorator(EControllerMethod.PATCH);
export const Options = createMethodDecorator(EControllerMethod.OPTIONS);
export const Head    = createMethodDecorator(EControllerMethod.HEAD);