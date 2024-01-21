import { ILoggerStrategy } from "@zcodeapp/interfaces";
import { LoggerStrategyConsole } from "../../src"
import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Logger Test", () => {

  let strategy: ILoggerStrategy;
  let debug, info, warn, error;

  beforeEach(() => {
    
    debug = null;
    info = null;
    warn = null;
    error = null;

    jest.spyOn(console, 'debug').mockImplementation((message: string, params?: any) => {
      debug = { message, params };
    });
    jest.spyOn(console, 'info').mockImplementation((message: string, params?: any) => {
      info = { message, params };
    });
    jest.spyOn(console, 'warn').mockImplementation((message: string, params?: any) => {
      warn = { message, params };
    });
    jest.spyOn(console, 'error').mockImplementation((message: string, params?: any) => {
      error = { message, params };
    });
    strategy = new LoggerStrategyConsole();
  });

  it("Test instance Logger", () => {
      expect(strategy).toBeInstanceOf(LoggerStrategyConsole)
  });

  it("Test debug with message and params", () => {
    const message = Utils.RandomString();
    const params = {
      key1: Utils.RandomString(),
      key2: Utils.RandomString()
    };
    strategy.debug(message, params);
    expect(debug?.message).toBe(`${message}`);
    expect(debug?.params).toBe(params);
  });

  it("Test debug with message and no params", () => {
    const message = Utils.RandomString();
    strategy.debug(message);
    expect(debug?.message).toBe(`${message}`);
    expect(debug?.params).toBe(undefined);
  });

  it("Test info with message and params", () => {
    const message = Utils.RandomString();
    const params = {
      key1: Utils.RandomString(),
      key2: Utils.RandomString()
    };
    strategy.info(message, params);
    expect(info?.message).toBe(`${message}`);
    expect(info?.params).toBe(params);
  });

  it("Test info with message and no params", () => {
    const message = Utils.RandomString();
    strategy.info(message);
    expect(info?.message).toBe(`${message}`);
    expect(info?.params).toBe(undefined);
  });

  it("Test warn with message and params", () => {
    const message = Utils.RandomString();
    const params = {
      key1: Utils.RandomString(),
      key2: Utils.RandomString()
    };
    strategy.warn(message, params);
    expect(warn?.message).toBe(`${message}`);
    expect(warn?.params).toBe(params);
  });

  it("Test warn with message and no params", () => {
    const message = Utils.RandomString();
    strategy.warn(message);
    expect(warn?.message).toBe(`${message}`);
    expect(warn?.params).toBe(undefined);
  });

  it("Test error with message and params", () => {
    const message = Utils.RandomString();
    const params = {
      key1: Utils.RandomString(),
      key2: Utils.RandomString()
    };
    strategy.error(message, params);
    expect(error?.message).toBe(`${message}`);
    expect(error?.params).toBe(params);
  });

  it("Test error with message and no params", () => {
    const message = Utils.RandomString();
    strategy.error(message);
    expect(error?.message).toBe(`${message}`);
    expect(error?.params).toBe(undefined);
  });

  it("Test fatal with message and params", () => {
    const message = Utils.RandomString();
    const params = {
      key1: Utils.RandomString(),
      key2: Utils.RandomString()
    };
    strategy.fatal(message, params);
    expect(error?.message).toBe(`${message}`);
    expect(error?.params).toBe(params);
  });

  it("Test fatal with message and no params", () => {
    const message = Utils.RandomString();
    strategy.fatal(message);
    expect(error?.message).toBe(`${message}`);
    expect(error?.params).toBe(undefined);
  });
});