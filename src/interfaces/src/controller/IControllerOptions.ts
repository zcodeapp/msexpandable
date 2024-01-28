import { TConstructor } from "../di";
import { IControllerInterceptor, IControllerMiddleware } from ".";

export interface IControllerOptions {
  path?: string;
  useControllerRoute?: boolean,
  middlewares?: TConstructor<IControllerMiddleware>[];
  interceptors?: TConstructor<IControllerInterceptor>[]
}