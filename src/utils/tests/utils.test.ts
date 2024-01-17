import { Utils } from "../src/utils";

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
})