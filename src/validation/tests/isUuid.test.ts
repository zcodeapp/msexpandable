import { Di } from "@zcodeapp/di";
import { IValidation } from "@zcodeapp/interfaces";
import { Validation } from "../src";
import { SampleDefaultValues } from "./isUuid/SampleDefaultValues";
import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Test IsString decorator", () => {

  const di = Di.getInstance();
  const validation = di.get<IValidation>(Validation);

  describe("Test for default values using SampleDefaultValues", () => {
    it("Test valid default value validation", () => {
      const sampleDefaultValues = di.get(SampleDefaultValues);
      sampleDefaultValues.default = Utils.Strings.Uuid();
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([]);
    });
  });

});