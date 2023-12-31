import { IDi } from "@zcodeapp/interfaces";
import { Utils } from "@zcodeapp/utils";
import { Di } from "../src"
import { ExampleSimpleString } from "./mocks/ExampleSimpleString"
// import { ExampleSimpleInject } from "./mocks/ExampleSimpleInject";
import { ExampleSimpleCallback } from "./mocks/ExampleSimpleCallback";
import { ExampleSimpleCallbackInject } from "./mocks/ExampleSimpleCallbackInject";

/* eslint-disable @typescript-eslint/no-explicit-any */

describe("Di Test", () => {

    let di: IDi;

    beforeEach(() => {
        di = new Di();
    });

    it("Test instance Di", () => {
        expect(di).toBeInstanceOf(Di)
    });

    it("Test instance string singleton content", () => {
        di.register("key", "value", true);
        expect(di.get("key")).toBe("value")
    });

    it("Test instance string non-singleton content", () => {
        di.register("key", "value", false);
        expect(di.get("key")).toBe("value")
    });

    it("Test instance string with lambda generator and singleton", () => {
        di.register<any, any>("key2", () => "value2", true);
        const value = di.get<() => string>("key2");
        expect(value()).toBe("value2")
    });

    it("Test instance string with lambda generator and non-singleton", () => {
        di.register<any, any>("key3", () => "value3", false);
        const value = di.get<() => string>("key3");
        expect(value()).toBe("value3")
    });

    it("Test instance ExampleSimpleString with singleton", () => {
        di.register(ExampleSimpleString, ["test content"], true);
        const instance = di.get(ExampleSimpleString);
        expect(instance.getContent()).toBe("test content")
    });

    it("Test instance ExampleSimpleInject with singleton", () => {
        di.register(ExampleSimpleCallback, [() => Utils.RandomString()], true);
        di.register(ExampleSimpleCallbackInject, [ExampleSimpleCallback], true);
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toEqual(result2);
    });

    it("Test instance ExampleSimpleInject with non-singleton", () => {
        di.register(ExampleSimpleCallback, [() => Utils.RandomString()], false);
        di.register(ExampleSimpleCallbackInject, [ExampleSimpleCallback], false);
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).not.toEqual(result2);
    });
})