import { TConstructor } from "../di";
import { EControllerMethod } from "./EControllerMethod";
import { IControllerInterceptor } from "./IControllerInterceptor";
import { IControllerMiddleware } from "./IControllerMiddleware";

export interface IControllerRouteOptions {
  path?: string,
  method: EControllerMethod;
  middlewares?: TConstructor<IControllerMiddleware>[],
  interceptors?: TConstructor<IControllerInterceptor>[]
}