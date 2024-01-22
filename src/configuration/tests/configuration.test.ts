import { IConfiguration } from "@zcodeapp/interfaces";
import { Configuration } from "../src";
import { Di } from "@zcodeapp/di";
import { Logger, LoggerStrategyConsole } from "@zcodeapp/logger";

describe("Configuration Test", () => {

  const di = Di.getInstance();
  let configuration: IConfiguration;

  di.register(Logger, {
    factory: () => {
      return new Logger({
        strategy: new LoggerStrategyConsole()
      });
    }
  });

  beforeEach(() => {
    configuration = di.get(Configuration);
  });

  it("Test instance Configuration", () => {
      expect(configuration).toBeInstanceOf(Configuration)
  });

  it("Test load env strategy", async () => {
    await configuration.load();
    expect(configuration.get("NODE_ENV")).toBe(process.env.NODE_ENV)
  })
})