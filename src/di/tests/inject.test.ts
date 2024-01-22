import { IDi } from "@zcodeapp/interfaces";
import { Di } from "../src";
import { ExampleSimpleDependencyInject } from "./mocks/inject/ExampleSimpleDependencyInject";
import { Utils } from "@zcodeapp/utils";
import { ExampleSimpleDependencyInjectValue } from "./mocks/inject";

describe("Di Inject Test", () => {
    
    let di: IDi;

    beforeEach(() => {
        di = Di.getInstance();
    });

    it("Test auto detect string/number inject ExampleSimpleDependencyInject singleton", () => {
        const instance = di.get(ExampleSimpleDependencyInject);
        expect(instance.getExampleSimpleInject().getContent()).toBe("content");
        expect(instance.getExampleSimpleInject().getSecond()).toBe(12345);
    });

    it("Test inject string value from ExampleSimpleDependencyInjectValue di value", () => {
        const value = Utils.Strings.RandomString();
        di.register("dependency-value", {
            singleton: true,
            value
        });
        const instance = di.get(ExampleSimpleDependencyInjectValue);
        expect(instance.getValue()).toBe(value);
    });

    it("Test inject string value from ExampleSimpleDependencyInjectValue di factory", () => {
        const value = Utils.Strings.RandomString();
        di.register("dependency-value", {
            singleton: true,
            factory: () => value
        });
        const instance = di.get(ExampleSimpleDependencyInjectValue);
        expect(instance.getValue()).toBe(value);
    });

});