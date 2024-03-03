import { IDi } from "@zcodeapp/interfaces";
import { Utils } from "@zcodeapp/utils";
import { Di } from "../src"
import { ExampleSimpleString, ExampleSimpleCallbackInject } from "./mocks/di"
import { ExampleSimpleCallback } from "./mocks/di/ExampleSimpleCallback"
import { Logger } from "@zcodeapp/logger";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Di Test", () => {

    let di: IDi;

    beforeEach(() => {
        di = Di.getInstance({
            restrictRewriteKey: false
        });
    });

    it("Test instance Di", () => {
        expect(di).toBeInstanceOf(Di)
    });

    it("Test passing logger instance", () => {
        di = Di.getInstance({
            restrictRewriteKey: false,
            logger: Logger.getInstance(),
            cleanSingleton: true
        });
        expect(di).toBeInstanceOf(Di)
    });

    it("Test di return self", () => {
        expect(di.get(Di)).toBeInstanceOf(Di);
    })

    it("Test di return Date", () => {
        expect(di.get(Date)).toBeInstanceOf(Date);
    })

    it("Test clean instance di", () => {
        const key = Utils.Strings.RandomString();
        const value = Utils.Strings.RandomString();
        di.register(key, {
            value
        });
        expect(di.get(key)).toBe(value);
        di = Di.getInstance({
            cleanSingleton: true
        });
        expect(() => {
            di.get(key)
        }).toThrow(`Instance not found [${key}]`);
    });

    it("Test instance not found", () => {
        const key = Utils.Strings.RandomString();
        expect(() => {
            di.get(key);
        }).toThrow(`Instance not found [${key}]`);
    });

    it("Test default (disabled) error on try rewrite key", () => {
        const key = Utils.Strings.RandomString();
        const value1 = Utils.Strings.RandomString();
        const value2 = Utils.Strings.RandomString();

        const di = Di.getInstance({
            restrictRewriteKey: false
        });
        di.register(key, {
            value: value1
        });
        
        expect(di.get(key)).toBe(value1);
        di.register(key, {
            value: value2
        });
        expect(di.get(key)).toBe(value2);
    });

    it("Test disable error on try rewrite key", () => {
        const key = Utils.Strings.RandomString();
        const value1 = Utils.Strings.RandomString();
        const value2 = Utils.Strings.RandomString();

        const di = Di.getInstance({
            restrictRewriteKey: false
        });
        di.register(key, {
            value: value1
        });
        
        expect(di.get(key)).toBe(value1);
        di.register(key, {
            value: value2
        });
        expect(di.get(key)).toBe(value2);
    });

    it("Test enable error on try rewrite key", () => {
        const key = Utils.Strings.RandomString();
        const value1 = Utils.Strings.RandomString();
        const value2 = Utils.Strings.RandomString();
        const di = Di.getInstance({
            restrictRewriteKey: true
        });
        di.register(key, {
            value: value1
        });
        expect(() => {
            di.register(key, {
                value: value2
            });
        }).toThrow(`Error on try overwrite instance [${key}]`);
    });

    it("Test instance string singleton content", () => {
        const key = Utils.Strings.RandomString();
        const value = Utils.Strings.RandomString();
        di.register(key, {
            singleton: true,
            value
        });
        expect(di.get(key)).toBe(value)
    });

    it("Test instance string non-singleton content", () => {
        const key = Utils.Strings.RandomString();
        const value = Utils.Strings.RandomString();
        di.register(key, {
            singleton: false,
            value
        });
        expect(di.get(key)).toBe(value)
    });

    it("Test instance string with factory generator and singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            singleton: true,
            factory: () => Utils.Strings.RandomString()
        });
        const result1 = di.get(key);
        const result2 = di.get(key);
        expect(result1).toBe(result2)
    });

    it("Test instance string with factory generator and non-singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            singleton: false,
            factory: () => Utils.Strings.RandomString()
        });
        const result1 = di.get(key);
        const result2 = di.get(key);
        expect(result1).not.toBe(result2)
    });

    it("Test instance ExampleSimpleString with singleton", () => {
        const value = Utils.Strings.RandomString();
        di.register(ExampleSimpleString, {
            singleton: true,
            providers: [value]
        });
        const instance = di.get(ExampleSimpleString);
        expect(instance.getContent()).toBe(value)
    });

    it("Test instance ExampleSimpleCallbackInject with all singleton passing args constructor", () => {
        di.register(ExampleSimpleCallback, {
            singleton: true,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: true,
            providers: [ExampleSimpleCallback]
        });
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toEqual(result2);
    });

    it("Test instance ExampleSimpleCallbackInject with class dependency singleton", () => {
        di.register(ExampleSimpleCallback, {
            singleton: true,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: false,
            providers: [ExampleSimpleCallback]
        });
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toEqual(result2);
    });

    it("Test instance ExampleSimpleCallbackInject with class singleton", () => {
        di.register(ExampleSimpleCallback, {
            singleton: false,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: true,
            providers: [ExampleSimpleCallback]
        });
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toEqual(result2);
    });

    it("Test instance ExampleSimpleCallbackInject with non-singleton", () => {
        di.register(ExampleSimpleCallback, {
            singleton: false,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: false,
            providers: [ExampleSimpleCallback]
        });
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).not.toEqual(result2);
    });

    it("Test provider for dependency injection singleton", () => {
        di.register(ExampleSimpleCallback, {
            singleton: true,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: true
        });
        di.provider(ExampleSimpleCallbackInject, [ExampleSimpleCallback]);
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).toBe(result2);
    });

    it("Test provider for dependency injection non-singleton", () => {
        di.register(ExampleSimpleCallback, {
            singleton: false,
            providers: [() => Utils.Strings.RandomString()]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: false
        });
        di.provider(ExampleSimpleCallbackInject, [ExampleSimpleCallback]);
        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();
        expect(result1).toHaveLength(10);
        expect(result2).toHaveLength(10);
        expect(result1).not.toEqual(result2);
    });

    it("Test provider for dependency not found", () => {
        di = Di.getInstance({
            cleanSingleton: true
        });
        expect(() => {
            di.provider(ExampleSimpleCallback, [ExampleSimpleCallback])
        }).toThrow(`Instance not found [${ExampleSimpleCallback}]`);
    });

    it("Test register undefined value for string singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            singleton: true
        });
        expect(() => {
            di.get(key)
        }).toThrow(`Configuration not have value [${key}]`);
    });

    it("Test register empty value for string singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            value: "",
            singleton: true
        });
        expect(() => {
            di.get(key)
        }).toThrow(`Configuration not have value [${key}]`);
    });

    it("Test register undefined value for string non-singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            singleton: false
        });
        expect(() => {
            di.get(key)
        }).toThrow(`Configuration not have value [${key}]`);
    });

    it("Test register empty value for string non-singleton", () => {
        const key = Utils.Strings.RandomString();
        di.register(key, {
            value: "",
            singleton: false
        });
        expect(() => {
            di.get(key)
        }).toThrow(`Configuration not have value [${key}]`);
    });

    it("Test get using local providers", () => {

        const firstContent = Utils.Strings.RandomString();

        di.register(ExampleSimpleCallback, {
            singleton: true,
            providers: [() => firstContent]
        });
        di.register(ExampleSimpleCallbackInject, {
            singleton: true,
            providers: [ExampleSimpleCallback]
        });

        const instance1 = di.get(ExampleSimpleCallbackInject);
        const instance2 = di.get(ExampleSimpleCallbackInject);
        const result1 = instance1.getClass().getContent();
        const result2 = instance2.getClass().getContent();

        const newContent = Utils.Strings.RandomString();

        const instance3 = di.get(ExampleSimpleCallbackInject, {
            providers: [
                {
                    class: ExampleSimpleCallback,
                    factory: () => new ExampleSimpleCallback(() => newContent)
                }
            ]
        });
        const result3 = instance3.getClass().getContent();

        const instance4 = di.get(ExampleSimpleCallbackInject);
        const instance5 = di.get(ExampleSimpleCallbackInject);
        const result4 = instance4.getClass().getContent();
        const result5 = instance5.getClass().getContent();

        expect(result1).toBe(firstContent);
        expect(result2).toBe(firstContent);
        expect(result3).toBe(newContent);
        expect(result4).toBe(firstContent);
        expect(result5).toBe(firstContent);
    });
})