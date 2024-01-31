import { Di, Injectable } from "@zcodeapp/di";
import {
  EControllerMethod,
  IController,
  IControllerConfiguration,
  IControllerManager,
  IControllerOptions,
  IControllerRoute,
  IControllerRouteOptions,
  TConstructor
} from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable()
export class ControllerManager implements IControllerManager {

  private _controllers: IControllerConfiguration[] = [];
  private _routes: IControllerRoute[] = [];

  constructor(
    private readonly _di: Di
  ){}

  public register<T = any>(constructor: TConstructor<T>, options?: IControllerOptions): void {

    this._di.register(constructor, { singleton: false });
    const key = this._getKey(constructor);
    const controller = this._controllers.find(x => x.key == key);

    let pathOption = options?.path ?? "/";
    pathOption = pathOption.startsWith('/') ? pathOption : `/${pathOption}`;

    if (options?.useControllerRoute)
      pathOption = `/${this._getKey(constructor).replace(/controller(?!.*controller)[^]*$/, "")}${pathOption}`;

    pathOption = pathOption.length > 1 && pathOption.endsWith('/') ? pathOption.slice(0, -1) : pathOption;

    if (controller) {
      const index = this._controllers.findIndex(x => x.key == key);
      this._controllers[index] = {
        key,
        constructor,
        options: {...options, ...{ path: pathOption, middlewares: options?.middlewares ?? [], interceptors: options?.interceptors ?? [] }}
      }
    } else {
      this._controllers.push({
        key,
        constructor,
        options: {...options, ...{ path: pathOption, middlewares: options?.middlewares ?? [], interceptors: options?.interceptors ?? [] }}
      });
    }
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

    let path = options?.path ?? "/";
    path = path.startsWith('/') ? path : `/${path}`;
    path = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    if (path == "/")
      path = "";

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
      summary: options?.summary ?? "",
      responses: options?.responses ?? [],
      middlewares: [...options?.middlewares ?? []],
      interceptors: [...options?.interceptors ?? []],
    });
  }

  public getControllers(): IControllerConfiguration[] {
    return this._controllers;
  }

  public getRoutes(): IControllerRoute[] {
    return this._routes.map(route => {
      const controller = this._controllers.find(x => x.key == route.key);
      return {
        ...route,
        middlewares: [...controller.options.middlewares, ...route.middlewares],
        interceptors: [...controller.options.interceptors, ...route.interceptors],
      };
    });
  }

  public reset(): void {
    this._controllers = [];
    this._routes = [];
  }

  private _getKey<T>(key: TConstructor<T>): string {
    return key.name.toLocaleLowerCase()
  }
}