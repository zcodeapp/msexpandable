import { TConstructor } from "../di";
import { IController } from "./IController";
import { IControllerConfiguration } from "./IControllerConfiguration";
import { IControllerOptions } from "./IControllerOptions";
import { IControllerRoute } from "./IControllerRoute";
import { IControllerRouteOptions } from "./IControllerRouteOptions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IControllerManager {
  register<T = any>(constructor: TConstructor<T>, options?: IControllerOptions);
  getRoutes(): IControllerRoute[];
  routes(
    constructor: TConstructor<IController>,
    propertyName: string,
    descriptor: PropertyDescriptor,
    options?: IControllerRouteOptions
  ): void
  getControllers(): IControllerConfiguration[];
  reset(): void;
}