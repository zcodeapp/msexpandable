import { Di } from "@zcodeapp/di";
import { SampleDefaultValues } from "./isNumber/SampleDefaultValues";
import { Validation } from "../src/validation";
import { IValidation } from "@zcodeapp/interfaces";
import { Utils } from "@zcodeapp/utils";
import { SampleMinMaxValues } from "./isNumber/SampleMinMaxValues";
import { SampleMinMaxParams } from "./isNumber/SampleMinMaxParams";
import { SampleInvalidType } from "./isNumber/SampleInvalidType";
import { SampleMessages } from "./isNumber/SampleMessages";
import { SampleMessagesDefault } from "./isNumber/SampleMessagesDefault";
import { SampleRegex } from "./isNumber/SampleRegex";

describe("Test isNumber decorator", () => {

  const di = Di.getInstance();
  const validation = di.get<IValidation>(Validation);

  describe("Test for default values using SampleDefaultValues", () => {
    it("Test valid default min/max value validation", () => {
      const sampleDefaultValues = di.get(SampleDefaultValues);
      sampleDefaultValues.default = Utils.Numbers.RandomNumber(2);
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([]);
    });
  
    it("Test undefined default min/max value validation", () => {
      const sampleDefaultValues = di.get(SampleDefaultValues);
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([]);
    });
  
    it("Test invalid default min value validation", () => {
      const sampleDefaultValues = di.get(SampleDefaultValues);
      sampleDefaultValues.default = -1;
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleDefaultValues",
        propertyName: "default",
        value: sampleDefaultValues.default
      }]);
    });
  
    it("Test invalid default max value validation", () => {
      const sampleDefaultValues = di.get(SampleDefaultValues);
      sampleDefaultValues.default = 256;
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleDefaultValues",
        propertyName: "default",
        value: sampleDefaultValues.default
      }]);
    });
  });

  describe("Test for default invalid values using SampleInvalidType", () => {
    it("Test invalid default max value validation", () => {
      const sampleInvalidType = di.get(SampleInvalidType);
      sampleInvalidType.default = "aaa";
      expect(validation.check(sampleInvalidType).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleInvalidType",
        propertyName: "default",
        value: sampleInvalidType.default
      }]);
    });
  });

  describe("Test for defined values for min/max using SampleMinMaxValues", () => {

    it("Test valid min/max value validation", () => {
      const sampleMinMaxValues = di.get(SampleMinMaxValues);
      sampleMinMaxValues.default = 5;
      expect(validation.check(sampleMinMaxValues).errors).toStrictEqual([]);
    });

    it("Test invalid min value validation", () => {
      const sampleMinMaxValues = di.get(SampleMinMaxValues);
      sampleMinMaxValues.default = 2;
      expect(validation.check(sampleMinMaxValues).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMinMaxValues",
        propertyName: "default",
        value: sampleMinMaxValues.default
      }]);
    });

    it("Test invalid max value validation", () => {
      const sampleMinMaxValues = di.get(SampleMinMaxValues);
      sampleMinMaxValues.default = 50;
      expect(validation.check(sampleMinMaxValues).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMinMaxValues",
        propertyName: "default",
        value: sampleMinMaxValues.default
      }]);
    });
  });

  describe("Test for defined values for min/max using SampleMinMaxParams", () => {

    it("Test valid min/max value validation", () => {
      const sampleMinMaxParams = di.get(SampleMinMaxParams);
      sampleMinMaxParams.default = 5;
      expect(validation.check(sampleMinMaxParams).errors).toStrictEqual([]);
    });

    it("Test invalid min value validation", () => {
      const sampleMinMaxParams = di.get(SampleMinMaxParams);
      sampleMinMaxParams.default = 2;
      expect(validation.check(sampleMinMaxParams).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMinMaxParams",
        propertyName: "default",
        value: sampleMinMaxParams.default
      }]);
    });

    it("Test invalid max value validation", () => {
      const sampleMinMaxParams = di.get(SampleMinMaxParams);
      sampleMinMaxParams.default = 50;
      expect(validation.check(sampleMinMaxParams).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMinMaxParams",
        propertyName: "default",
        value: sampleMinMaxParams.default
      }]);
    });

    it("Test min/max/params into validation", () => {
      const sampleMinMaxParams = di.get(SampleMinMaxParams);
      sampleMinMaxParams.params = 1;
      expect(validation.check(sampleMinMaxParams).errors).toStrictEqual([]);
    });

    it("Test min/max/params into validation error", () => {
      const sampleMinMaxParams = di.get(SampleMinMaxParams);
      sampleMinMaxParams.params = 10000;
      expect(validation.check(sampleMinMaxParams).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMinMaxParams",
        propertyName: "params",
        value: sampleMinMaxParams.params
      }]);
    });
  });

  describe("Test default messages for values using SampleMessagesDefault", () => {

    it("Test empty message for required", () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault);
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([{
        message: "Class have property required without value",
        constructor: "SampleMessagesDefault",
        propertyName: "_empty",
        value: sampleMessagesDefault._empty
      }]);
    });

    it("Test invalid message for int/string non required", () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault);
      sampleMessagesDefault._empty = 1;
      sampleMessagesDefault._invalid1 = "invalid content";
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMessagesDefault",
        propertyName: "_invalid1",
        value: sampleMessagesDefault._invalid1
      }]);
    });

    it("Test invalid message for int invalid non required", () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault);
      sampleMessagesDefault._empty = 1;
      sampleMessagesDefault._invalid2 = 1000;
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleMessagesDefault",
        propertyName: "_invalid2",
        value: sampleMessagesDefault._invalid2
      }]);
    });
  });

  describe("Test custom messages for values using SampleMessages", () => {

    it("Test empty message for required", () => {
      const sampleMessages = di.get(SampleMessages);
      expect(validation.check(sampleMessages).errors).toStrictEqual([{
        message: "Empty message",
        constructor: "SampleMessages",
        propertyName: "_empty",
        value: sampleMessages._empty
      }]);
    });

    it("Test invalid message for int/string non required", () => {
      const sampleMessages = di.get(SampleMessages);
      sampleMessages._empty = 1;
      sampleMessages._invalid1 = "invalid content";
      expect(validation.check(sampleMessages).errors).toStrictEqual([{
        message: "Invalid string message",
        constructor: "SampleMessages",
        propertyName: "_invalid1",
        value: sampleMessages._invalid1
      }]);
    });

    it("Test invalid message for int invalid non required", () => {
      const sampleMessages = di.get(SampleMessages);
      sampleMessages._empty = 1;
      sampleMessages._invalid2 = 1000;
      expect(validation.check(sampleMessages).errors).toStrictEqual([{
        message: "Invalid content message",
        constructor: "SampleMessages",
        propertyName: "_invalid2",
        value: sampleMessages._invalid2
      }]);
    });
  });

  describe("Test regex for values using SampleRegex", () => {

    it("Test regex with valid value", () => {
      const sampleRegex = di.get(SampleRegex);
      sampleRegex.default = 99;
      expect(validation.check(sampleRegex).errors).toStrictEqual([]);
    });

    it("Test regex with invalid value", () => {
      const sampleRegex = di.get(SampleRegex);
      sampleRegex.default = 999;
      expect(validation.check(sampleRegex).errors).toStrictEqual([{
        message: "Class have invalid value",
        constructor: "SampleRegex",
        propertyName: "default",
        value: sampleRegex.default
      }]);
    });
  });
});