import { Di, Injectable } from "@zcodeapp/di";
import { Logger } from "@zcodeapp/logger";
import {
  EControllerMethod,
  IController,
  IControllerConfiguration,
  IControllerManager,
  IControllerOptions,
  IControllerRoute,
  IControllerRouteOptions,
  IDi,
  TConstructor
} from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable()
export class ControllerManager implements IControllerManager {

  private _controllers: IControllerConfiguration[] = [];
  private _routes: IControllerRoute[] = [];

  constructor(
    private readonly _logger: Logger,
    private readonly _di: Di
  ){}

  public register<T = any>(constructor: TConstructor<T>, options?: IControllerOptions): void {
    this._di.register(constructor, { singleton: false });
    const key = this._getKey(constructor);
    if (this._controllers.find(x => x.key == key))
      throw new Error(`Controller already exists [${constructor.name}]`);

    let pathOption = options?.path ?? "/";
    pathOption = pathOption.startsWith('/') ? pathOption : `/${pathOption}`;

    if (options?.useControllerRoute)
      pathOption = `/${this._getKey(constructor)}${pathOption}`;

    pathOption = pathOption.length > 1 && pathOption.endsWith('/') ? pathOption.slice(0, -1) : pathOption;

    this._controllers.push({
      key,
      constructor,
      options: {...options, ...{ path: pathOption }}
    });
  }

  public routes(
    constructor: TConstructor<IController>,
    propertyName: string,
    descriptor: PropertyDescriptor,
    options?: IControllerRouteOptions
  ): void {
    const key = this._getKey(constructor);
    const controller = this._controllers.find(x => x.key == key);
    if (!controller)
      throw new Error(`Controller not found [${constructor.name}]`);

    let pathOption = options?.path ?? "/";
    pathOption = pathOption.startsWith('/') ? pathOption : `/${pathOption}`;

    let path = `${controller.options.path}${pathOption}`;
    path = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

    const method = options?.method ?? EControllerMethod.GET;

    if (this._routes.find(x => {
      return x.key == key
        && x.path == path
        && x.method == method;
    }))
      throw new Error(`Route already exists [${method} ${path}]`);


    this._routes.push({
      key,
      descriptor,
      propertyName,
      path,
      method,
      middlewares: [...controller.options?.middleware ?? [], ...options?.middlewares ?? []],
      interceptors: [...controller.options?.interceptors ?? [], ...options?.interceptors ?? []],
    });
  }

  public getControllers(): IControllerConfiguration[] {
    return this._controllers;
  }

  public getRoutes(): IControllerRoute[] {
    return this._routes;
  }

  public reset(): void {
    this._controllers = [];
    this._routes = [];
  }

  private _getKey<T>(key: TConstructor<T>): string {
    return key.name.toLocaleLowerCase()
  }
}