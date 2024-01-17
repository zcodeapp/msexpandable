import { IDi } from "@zcodeapp/interfaces";
import { ExampleSimpleInjectable } from "./mocks/ExampleSimpleInjectable"
import { ExampleComplexInjectable } from "./mocks/ExampleComplexInjectable"
import { Di } from "../src";
import { ExampleComplexMultiInjectable } from "./mocks/ExampleComplexMultiInjectable";

describe("Di Test", () => {
    
    let di: IDi;

    beforeEach(() => {
        di = Di.getInstance();
    });

    it("Test auto detect string/number dependencies ExampleSimpleInjectable", () => {
        const instance = di.get(ExampleSimpleInjectable);
        expect(instance.getContent()).toBe("content");
        expect(instance.getSecond()).toBe(12345);
    });

    it("Test auto detect class dependency ExampleComplexInjectable", () => {
        const instance = di.get(ExampleComplexInjectable);
        expect(instance.getContent().getContent()).toBe("content");
        expect(instance.getContent().getSecond()).toBe(12345);
    });

    it("Test auto detect classes dependencies ExampleComplexMultiInjectable", () => {
        const instance = di.get(ExampleComplexMultiInjectable);
        expect(instance.getContent().getContent().getContent()).toBe("content");
        expect(instance.getContent().getContent().getSecond()).toBe(12345);
        expect(instance.getSimple().getContent()).toBe("content");
        expect(instance.getSimple().getSecond()).toBe(12345);
    });
});