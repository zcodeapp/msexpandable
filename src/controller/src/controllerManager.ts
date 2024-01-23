import { Injectable } from "@zcodeapp/di";
import { Logger } from "@zcodeapp/logger";
import { Utils } from "@zcodeapp/utils";
import {
  IController,
  IControllerConfiguration,
  IControllerInterceptor,
  IControllerMiddleware,
  IControllerOptions,
  IControllerRoute,
  IControllerRouteOptions,
  TConstructor
} from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable()
export class ControllerManager {

  private _controllers: IControllerConfiguration[] = [];
  private _routes: IControllerRoute[] = [];

  constructor(
    private readonly _logger: Logger
  ){}

  public register<T = any>(constructor: TConstructor<T>, options?: IControllerOptions) {
    const key = this._getKey(constructor);
    if (this._controllers.find(x => x.key == key))
      throw new Error(`Controller already exists [${constructor.name}]`);
    
    this._controllers.push({
      key,
      constructor,
      options
    });
  }

  public routes(
    constructor: TConstructor<IController>,
    propertyName: string,
    descriptor: PropertyDescriptor,
    options?: IControllerRouteOptions
  ) {
    const key = this._getKey(constructor);
    if (this._routes.find(x => {
      return x.key == key
        && x.path == options.path
        && x.method == options.method;
    }))
      throw new Error(`Route already exists [${options.method} ${options.path}]`);

    const controller = this._controllers.find(x => x.key == key);
    if (!controller)
      throw new Error(`Controller not found [${constructor.name}]`);

    let path = `${controller.options.path}${options.path}`;
    if (controller.options?.useControllerRoute)
      path = `${this._getKey(constructor)}/${path}`;

    this._routes.push({
      key,
      descriptor,
      propertyName,
      path,
      method: options.method,
      middlewares: [...controller.options?.middleware ?? [], ...options?.middlewares ?? []],
      interceptors: [...controller.options?.interceptors ?? [], ...options?.interceptors ?? []],
    });
  }

  public getRoutes(): IControllerRoute[] {
    return this._routes;
  }

  private _getKey<T>(key: TConstructor<T>): string {
    return key.name.toLocaleLowerCase()
  }
}