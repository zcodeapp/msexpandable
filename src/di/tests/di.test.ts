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
        const key = Utils.RandomString();
        const content = Utils.RandomString();
        di.register(key, content, true);
        expect(di.get(key)).toBe(content)
    });

    it("Test instance string non-singleton content", () => {
        const key = Utils.RandomString();
        const content = Utils.RandomString();
        di.register(key, content, false);
        expect(di.get(key)).toBe(content)
    });

    it("Test instance string with lambda generator and singleton", () => {
        const key = Utils.RandomString();
        const content = Utils.RandomString();
        di.register<any, any>(key, () => content, true);
        const value = di.get<() => string>(key);
        expect(value()).toBe(content)
    });

    it("Test instance string with lambda generator and non-singleton", () => {
        const key = Utils.RandomString();
        const content = Utils.RandomString();
        di.register<any, any>(key, () => content, false);
        const value = di.get<() => string>(key);
        expect(value()).toBe(content)
    });

    it("Test instance ExampleSimpleString with singleton", () => {
        const content = Utils.RandomString();
        di.register(ExampleSimpleString, [content], true);
        const instance = di.get(ExampleSimpleString);
        expect(instance.getContent()).toBe(content)
    });

    it("Test instance ExampleSimpleInject with all singleton passing args constructor", () => {
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

    it("Test instance ExampleSimpleInject with class dependency singleton", () => {
        di.register(ExampleSimpleCallback, [() => Utils.RandomString()], true);
        di.register(ExampleSimpleCallbackInject, [ExampleSimpleCallback], false);
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toEqual(result2);
    });

    it("Test instance ExampleSimpleInject with class singleton", () => {
        di.register(ExampleSimpleCallback, [() => Utils.RandomString()], false);
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