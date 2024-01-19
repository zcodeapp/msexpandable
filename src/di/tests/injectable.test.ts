import { IDi } from "@zcodeapp/interfaces";
import { Di } from "../src";
import {
    ExampleSimpleInjectable,
    ExampleComplexInjectable,
    ExampleComplexMultiInjectable,
    ExampleSimpleInjectableNonSingleton,
    ExampleSimpleInjectableSingleton,
    ExampleMultiInjectableSingleton,
    ExampleMultiInjectableNonSingleton,
    ExampleComplexInjectableNotFoundSingleton
} from "./mocks/injectable"

describe("Di Injectable Test", () => {
    
    let di: IDi;

    beforeEach(() => {
        di = Di.getInstance();
    });

    it("Test auto detect string/number dependencies ExampleSimpleInjectable singleton", () => {
        const instance = di.get(ExampleSimpleInjectable);
        expect(instance.getContent()).toBe("content");
        expect(instance.getSecond()).toBe(12345);
    });

    it("Test auto detect class dependency ExampleComplexInjectable singleton", () => {
        const instance = di.get(ExampleComplexInjectable);
        expect(instance.getContent().getContent()).toBe("content");
        expect(instance.getContent().getSecond()).toBe(12345);
    });

    it("Test auto detect classes dependencies ExampleComplexMultiInjectable singleton", () => {
        const instance = di.get(ExampleComplexMultiInjectable);
        expect(instance.getContent().getContent().getContent()).toBe("content");
        expect(instance.getContent().getContent().getSecond()).toBe(12345);
        expect(instance.getSimple().getContent()).toBe("content");
        expect(instance.getSimple().getSecond()).toBe(12345);
    });

    it("Test auto detect string dependencies ExampleSimpleInjectableSingleton singleton", () => {
        const instance1 = di.get(ExampleSimpleInjectableSingleton);
        const instance2 = di.get(ExampleSimpleInjectableSingleton);
        expect(instance1.getSecret()).toHaveLength(10);
        expect(instance2.getSecret()).toHaveLength(10);
        expect(instance1.getSecret()).toEqual(instance2.getSecret());
    });

    it("Test auto detect string dependencies ExampleSimpleInjectableNonSingleton non-singleton", () => {
        const instance1 = di.get(ExampleSimpleInjectableNonSingleton);
        const instance2 = di.get(ExampleSimpleInjectableNonSingleton);
        expect(instance1.getSecret()).toHaveLength(10);
        expect(instance2.getSecret()).toHaveLength(10);
        expect(instance1.getSecret()).not.toEqual(instance2.getSecret());
    });

    it("Test auto detect string dependencies ExampleMultiInjectableSingleton singleton", () => {
        const instance1 = di.get(ExampleMultiInjectableSingleton);
        const instance2 = di.get(ExampleMultiInjectableSingleton);
        expect(instance1.getSecretA()).toHaveLength(10);
        expect(instance1.getSecretB()).toBe("fixed");
        expect(instance2.getSecretA()).toHaveLength(10);
        expect(instance2.getSecretB()).toBe("fixed");
        expect(instance1.getSecretA()).toEqual(instance2.getSecretA());
    });

    it("Test auto detect string dependencies ExampleMultiInjectableNonSingleton non-singleton", () => {
        const instance1 = di.get(ExampleMultiInjectableNonSingleton);
        const instance2 = di.get(ExampleMultiInjectableNonSingleton);
        expect(instance1.getSecretA()).toHaveLength(10);
        expect(instance1.getSecretB()).toBe("fixed");
        expect(instance2.getSecretA()).toHaveLength(10);
        expect(instance2.getSecretB()).toBe("fixed");
        expect(instance1.getSecretA()).not.toEqual(instance2.getSecretA());
    });

    it("Test error on try construct not found dependency class", () => {
        expect(() => {
            di.get(ExampleComplexInjectableNotFoundSingleton);
        }).toThrow(`Param constructor not found [${ExampleComplexInjectableNotFoundSingleton.toString()}]`);
    });
});