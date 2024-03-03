import { Utils } from "../src";

interface IOriginalClone {
    name: string;
}

describe("Utils Test Strings", () => {

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

  it("Test UUID", () => {
    expect(Utils.Strings.Uuid()).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)
  });
});

describe("Utils Test Transforms", () => {

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
});

describe("Utils Test Dates", () => {
  it("Test datetime timestamp", () => {
    const timestamp = Math.floor(Math.floor(Date.now() / 1000) / 100);
    const timestampDatetime = Math.floor(Utils.Datetime.currentTimestamp() / 100);
    expect(timestampDatetime).toBe(timestamp);
  });
});

describe("Utils Test Numbers", () => {
  it("Test length random number", () => {
    expect(String(Utils.Numbers.RandomNumber())).toHaveLength(10);
    expect(String(Utils.Numbers.RandomNumber(2))).toHaveLength(2);
    expect(Utils.Numbers.RandomNumber() > 0).toBeTruthy();
    expect(Utils.Numbers.RandomNumber(2) > 0).toBeTruthy();
  });

  it("Test length random decimal", () => {
    expect(String(Utils.Numbers.RandomDecimal())).toHaveLength(13);
    expect(String(Utils.Numbers.RandomDecimal(1))).toHaveLength(4);
    expect(String(Utils.Numbers.RandomDecimal(1, 2))).toHaveLength(4);
    expect(String(Utils.Numbers.RandomDecimal(1, 5))).toHaveLength(7);
  });

  it("Test characters random number", () => {
    expect(() => {
      if (!/^[0-9]+$/.test(String(Utils.Numbers.RandomNumber(2)))) {
        throw new Error("Random string have wrong characters, rule: ");
      }
    }).not.toThrow();
  });
});