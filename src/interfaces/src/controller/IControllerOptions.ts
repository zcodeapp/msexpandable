import { TConstructor } from "../di";
import { IControllerInterceptor, IControllerMiddleware } from ".";

export interface IControllerOptions {
  path?: string;
  useControllerRoute?: boolean,
  middleware?: TConstructor<IControllerMiddleware>[];
  interceptors?: TConstructor<IControllerInterceptor>[]
}