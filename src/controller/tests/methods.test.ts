import { EControllerMethod, IControllerManager } from "@zcodeapp/interfaces";
import { Di } from "@zcodeapp/di";
import { ControllerManager } from "../src/controllerManager";
import { RoutePathMethodsController } from "./mock/methods/RoutePathMethodsController";
import { RoutePathEmptyMethodsController } from "./mock/methods/RoutePathEmptyMethodsController"
import { RoutePathEmptyUseMethodsControllers } from "./mock/methods/RoutePathEmptyUseMethodsControllers";
import { MiddlewareController } from "./mock/methods/MiddlewareController";
import { MiddlewareDependency } from "./mock/methods/MiddlewareDependency";
import { MiddlewareRouteController } from "./mock/methods/MiddlewareRouteController";
import { InterceptorDependency } from "./mock/methods/InterceptorDependency";
import { InterceptorController } from "./mock/methods/InterceptorController";
import { MiddlewareRouteDependency } from "./mock/methods/MiddlewareRouteDependency";
import { MiddlewareRouteEmptyController } from "./mock/methods/MiddlewareRouteEmptyController";
import { InterceptorRouteDependency } from "./mock/methods/InterceptorRouteDependency";
import { InterceptorRouteController } from "./mock/methods/InterceptorRouteController";
import { InterceptorRouteEmptyController } from "./mock/methods/InterceptorRouteEmptyController";

describe("Methods test", () => {

    const di = Di.getInstance();
    let controllerManager: IControllerManager;

    beforeEach(() => {
        controllerManager = di.get(ControllerManager);
    });

    it("Test methods populate route controller using RoutePathMethodsController", () => {
      [
        {
          method: EControllerMethod.GET,
          route: "/routePath/get"
        },
        {
          method: EControllerMethod.POST,
          route: "/routePath/post"
        },
        {
          method: EControllerMethod.PUT,
          route: "/routePath/put"
        },
        {
          method: EControllerMethod.DELETE,
          route: "/routePath/delete"
        },
        {
          method: EControllerMethod.PATCH,
          route: "/routePath/patch"
        },
        {
          method: EControllerMethod.OPTIONS,
          route: "/routePath/options"
        },
        {
          method: EControllerMethod.HEAD,
          route: "/routePath/head"
        }
      ].map(item => {
        const controller = controllerManager.getControllers().find(x => x.key == RoutePathMethodsController.name.toLocaleLowerCase());
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == RoutePathMethodsController.name.toLocaleLowerCase()
            && x.method == item.method
        });
        expect(`${controller?.options?.path}${method?.path}`).toBe(item.route);
      });
    });

    it("Test methods populate empty route controller using RoutePathEmptyMethodsController", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD,
      ].map(_method => {
        const controller = controllerManager.getControllers().find(x => x.key == RoutePathEmptyMethodsController.name.toLocaleLowerCase());
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == RoutePathEmptyMethodsController.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(`${controller?.options?.path}${method?.path}`).toBe("/");
      });
    });

    it("Test methods populate empty route default controller using RoutePathEmptyUseMethodsControllers", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD,
      ].map(_method => {
        const controller = controllerManager.getControllers().find(x => x.key == RoutePathEmptyUseMethodsControllers.name.toLocaleLowerCase());
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == RoutePathEmptyUseMethodsControllers.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(`${controller?.options?.path}${method?.path}`).toBe("/routepathemptyusemethods");
      });
    });

    it("Test methods populate controller middlewares using MiddlewareController", () => {
      const controller = controllerManager.getControllers().find(x => x.key == MiddlewareController.name.toLocaleLowerCase());
      expect(controller?.options?.middlewares).toStrictEqual([MiddlewareDependency]);
    });

    it("Test methods populate route middlewares using MiddlewareRouteController", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD
      ].map(_method => {
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == MiddlewareRouteController.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(method?.middlewares).toStrictEqual([MiddlewareDependency, MiddlewareRouteDependency])
      });
    });

    it("Test methods populate route middlewares with empty controller middleware using MiddlewareRouteEmptyController", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD
      ].map(_method => {
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == MiddlewareRouteEmptyController.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(method?.middlewares).toStrictEqual([MiddlewareRouteDependency])
      });
    });

    it("Test methods populate controller interceptors using InterceptorController", () => {
      const controller = controllerManager.getControllers().find(x => x.key == InterceptorController.name.toLocaleLowerCase());
      expect(controller?.options?.interceptors).toStrictEqual([InterceptorDependency]);
    });

    it("Test methods populate route interceptors using InterceptorRouteController", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD
      ].map(_method => {
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == InterceptorRouteController.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(method?.interceptors).toStrictEqual([InterceptorDependency, InterceptorRouteDependency])
      });
    });

    it("Test methods populate route interceptors with empty controller interceptor using InterceptorRouteEmptyController", () => {
      [
        EControllerMethod.GET,
        EControllerMethod.POST,
        EControllerMethod.PUT,
        EControllerMethod.DELETE,
        EControllerMethod.PATCH,
        EControllerMethod.OPTIONS,
        EControllerMethod.HEAD
      ].map(_method => {
        const methods = controllerManager.getRoutes();
        const method = methods.find(x => {
          return x.key == InterceptorRouteEmptyController.name.toLocaleLowerCase()
            && x.method == _method
        });
        expect(method?.interceptors).toStrictEqual([InterceptorRouteDependency])
      });
    });
});