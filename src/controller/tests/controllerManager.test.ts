import { Di } from "@zcodeapp/di";
import { EControllerMethod, IControllerManager } from "@zcodeapp/interfaces";
import { Logger, LoggerStrategyConsole } from "@zcodeapp/logger";
import { ControllerManager } from "../src/controllerManager";
import { SampleController } from "./mock/controllerManager/sampleController";
import { Utils } from "@zcodeapp/utils";
import { SampleMiddleware } from "./mock/controllerManager/sampleMiddleware";
import { SampleInterceptor } from "./mock/controllerManager/sampleInterceptor";

describe("ControllerManager Test", () => {

    let di = Di.getInstance();
    let controllerManager: IControllerManager;

    di.register(Logger, {
        factory: () => {
          return new Logger({
            strategy: new LoggerStrategyConsole()
          });
        }
      });

    beforeEach(() => {
        controllerManager = di.get(ControllerManager);
    });

    it("Test instance", () => {
        expect(controllerManager).toBeInstanceOf(ControllerManager)
    });

    it("Test reset", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        let controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor.name).toBe(SampleController.name);
        controllerManager.reset();
        controllerManager.register(SampleController);
        controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor.name).toBe(SampleController.name);
    })

    it("Test register controller without options", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe("/");
    });

    it("Test register controller just slash path, in options", () => {
        const path = `/${Utils.Strings.RandomString()}`;
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: "/"
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe("/");
    });

    it("Test register controller with path and slash, in options", () => {
        const path = `/${Utils.Strings.RandomString()}`;
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(path);
    });

    it("Test register controller with path and slash end, in options", () => {
        const path = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: `${path}/`
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor?.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(`/${path}`);
    });

    it("Test register controller with path and remove slash, in options", () => {
        const path = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor?.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(`/${path}`);
    });

    it("Test register controller with useControllerRoute and not path, in options", () => {
        const path = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            useControllerRoute: true
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor?.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(`/${SampleController.name.toLocaleLowerCase()}`);
    });

    it("Test register controller with useControllerRoute and path slash, in options", () => {
        const path = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: "/",
            useControllerRoute: true
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor?.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(`/${SampleController.name.toLocaleLowerCase()}`);
    });

    it("Test register controller with useControllerRoute and path, in options", () => {
        const path = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path,
            useControllerRoute: true
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.constructor?.name).toBe(SampleController.name);
        expect(controller?.options?.path).toBe(`/${SampleController.name.toLocaleLowerCase()}/${path}`);
    });

    it("Test register controller middleware", () => {
        controllerManager.reset();
        controllerManager.register(SampleController, {
            middleware: [SampleMiddleware]
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.options?.middleware).toStrictEqual([SampleMiddleware])
    });

    it("Test register controller interceptor", () => {
        controllerManager.reset();
        controllerManager.register(SampleController, {
            interceptors: [SampleInterceptor]
        });
        const controller = controllerManager.getControllers().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(controller?.options?.interceptors).toStrictEqual([SampleInterceptor])
    });

    it("Exception on try register controller twice round", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        expect(() => {
            controllerManager.register(SampleController);
        }).toThrow(`Controller already exists [${SampleController.name}]`)
    });

    it("Test add default route", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        controllerManager.routes(SampleController, "getTest", {});
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.path).toBe("/")
    });

    it("Test add controller path for routes", () => {
        const pathController = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: `/${pathController}`
        });
        controllerManager.routes(SampleController, "getTest", {});
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.path).toBe(`/${pathController}`)
    });

    it("Test add controller path and route path", () => {
        const pathController = Utils.Strings.RandomString();
        const pathRoute = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: `/${pathController}`
        });
        controllerManager.routes(SampleController, "getTest", {}, {
            path: `/${pathRoute}`
        });
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.path).toBe(`/${pathController}/${pathRoute}`)
    });

    it("Test add controller path and route path without slashes", () => {
        const pathController = Utils.Strings.RandomString();
        const pathRoute = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: `${pathController}`
        });
        controllerManager.routes(SampleController, "getTest", {}, {
            path: `${pathRoute}`
        });
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.path).toBe(`/${pathController}/${pathRoute}`)
    });

    it("Test add controller path and route path end slashes", () => {
        const pathController = Utils.Strings.RandomString();
        const pathRoute = Utils.Strings.RandomString();
        controllerManager.reset();
        controllerManager.register(SampleController, {
            path: `${pathController}/`
        });
        controllerManager.routes(SampleController, "getTest", {}, {
            path: `${pathRoute}/`
        });
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.path).toBe(`/${pathController}/${pathRoute}`)
    });

    it("Test add controller default GET for route", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        controllerManager.routes(SampleController, "getTest", {});
        
        const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
        expect(route?.method).toBe(EControllerMethod.GET)
    });

    it("Test add controller methods for route", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);

        [
            EControllerMethod.GET,
            EControllerMethod.POST,
            EControllerMethod.PUT,
            EControllerMethod.DELETE,
            EControllerMethod.HEAD,
            EControllerMethod.OPTIONS,
            EControllerMethod.PATCH
        ].map(method => {
            
            controllerManager.routes(SampleController, "getTest", {}, {
                method
            });
            
            const route = controllerManager.getRoutes().find(x => x.key == SampleController.name.toLocaleLowerCase());
            expect(route?.method).toBe(method)
        })

    });

    it("Try add route for not found controller", () => {
        expect(() => {
            controllerManager.reset();
            controllerManager.routes(SampleController, "getTest", {}, {
                method: EControllerMethod.HEAD
            });
        }).toThrow(`Controller not found [${SampleController.name}]`);
    });

    it("Exception on try register controller route default GET twice round", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        controllerManager.routes(SampleController, "getTest", {});
        expect(() => {
            controllerManager.routes(SampleController, "getTest", {});
        }).toThrow(`Route already exists [GET /]`)
    });

    it("Exception on try register controller route methods twice round", () => {
        controllerManager.reset();
        controllerManager.register(SampleController);
        [
            EControllerMethod.GET,
            EControllerMethod.POST,
            EControllerMethod.PUT,
            EControllerMethod.DELETE,
            EControllerMethod.HEAD,
            EControllerMethod.OPTIONS,
            EControllerMethod.PATCH
        ].map(method => {
            controllerManager.routes(SampleController, "getTest", {}, {
                method
            });
            expect(() => {
                controllerManager.routes(SampleController, "getTest", {}, {
                    method
                });
            }).toThrow(`Route already exists [${method} /]`)
        })
    });
})