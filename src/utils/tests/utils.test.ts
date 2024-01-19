import { Utils } from "../src/utils";

interface IOriginalClone {
    name: string;
}

describe("Utils Test", () => {

    it("Test length random string", () => {
        expect(Utils.RandomString()).toHaveLength(10)
        expect(Utils.RandomString(2)).toHaveLength(2)
        expect(Utils.RandomString(20)).toHaveLength(20)
    });

    it("Test characters random string", () => {
        expect(() => {
            if (!/^[a-zA-Z0-9]+$/.test(Utils.RandomString(2000))) {
                throw new Error("Random string have wrong characters, rule: ");
            }
        }).not.toThrow();
    });

    it ("Test clone object", () => {
        const original: IOriginalClone = { "name": "Example" };
        const clone = Utils.Clone<IOriginalClone>(original);
        clone.name = "Changed";
        expect(original.name).toBe("Example");
        expect(clone.name).toBe("Changed");
    })
})