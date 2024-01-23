import { Di } from "@zcodeapp/di";
import { ControllerManager } from "./controllerManager";
import {
  TConstructor,
  IController,
  IControllerRouteOptions,
  EControllerMethod
} from "@zcodeapp/interfaces";

const di = Di.getInstance();
const controllerManager = di.get(ControllerManager);

function createMethodDecorator(method: EControllerMethod) {
  return function(path?: string, options?: IControllerRouteOptions) {
    return function(constructor: TConstructor<IController>, propertyName: string, descriptor: PropertyDescriptor) {
      controllerManager.routes(constructor, propertyName, descriptor, { ...{ path: path ?? "/", method }, ...options ?? {} });
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