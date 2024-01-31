import { Utils } from "../src";

interface IOriginalClone {
    name: string;
}

describe("Utils Test", () => {

  it("Test length random string", () => {
    expect(Utils.Strings.RandomString()).toHaveLength(10)
    expect(Utils.Strings.RandomString(2)).toHaveLength(2)
  });

  it("Test characters random string", () => {
    expect(() => {
      if (!/^[a-zA-Z0-9]+$/.test(Utils.Strings.RandomString(2000))) {
        throw new Error("Random string have wrong characters, rule: ");
      }
    }).not.toThrow();
  });

  it ("Test clone object", () => {
    const original: IOriginalClone = { "name": "Example" };
    const clone = Utils.Transform.Clone<IOriginalClone>(original);
    clone.name = "Changed";
    expect(original.name).toBe("Example");
    expect(clone.name).toBe("Changed");
  });

  it("Test md5", () => {
    const key = "adec7ae2ad44db0d3152c5b02940a020";
    const md5 = "8d06de6117c2aee4ef4f963451019b47";
    const result = Utils.Transform.md5(key);
    expect(result).toBe(md5);
  });

  it("Test datetime timestamp", () => {
    const timestamp = Math.floor(Math.floor(Date.now() / 1000) / 100);
    const timestampDatetime = Math.floor(Utils.Datetime.currentTimestamp() / 100);
    expect(timestampDatetime).toBe(timestamp);
  });
})