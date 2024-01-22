import { ELoggerLevel, ILogger, ILoggerOptions } from "@zcodeapp/interfaces";
import { Logger } from "../src"
import { TestStrategy } from "./mock/logger/strategy";
import { Utils } from "@zcodeapp/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
describe("Logger Test", () => {

  let logger: ILogger;
  let debug, info, warn, error, fatal;
  
  const strategy = {
    debug: (message: string, params?: any) => {
      debug = { message, params };
    },
    info: (message: string, params?: any) => {
      info = { message, params };
    },
    warn: (message: string, params?: any) => {
      warn = { message, params };
    },
    error: (message: string, params?: any) => {
      error = { message, params };
    },
    fatal: (message: string, params?: any) => {
      fatal = { message, params };
    },
  };

  beforeEach(() => {
    debug = null;
    info = null;
    warn = null;
    error = null;
    fatal = null;
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.DEBUG
    });
  });

  it("Test instance Logger", () => {
      expect(logger).toBeInstanceOf(Logger)
  });

  it("Test debug message and params", () => {
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.debug(message, params);
    expect(debug?.message).toBe(`[DEBUG] ${message}`);
    expect(debug?.params).toBe(JSON.stringify(params));
  });

  it("Test debug message with no params", () => {
    const message = Utils.Strings.RandomString();
    logger.debug(message);
    expect(debug?.message).toBe(`[DEBUG] ${message}`);
    expect(debug?.params).toBe(undefined);
  });

  it("Test debug disable", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.INFORMATION
    });
    const message = Utils.Strings.RandomString();
    logger.debug(message);
    expect(debug?.message).toBe(undefined);
    expect(debug?.params).toBe(undefined);
  });

  it("Test info message and params", () => {
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.info(message, params);
    expect(info?.message).toBe(`[INFO] ${message}`);
    expect(info?.params).toBe(JSON.stringify(params));
  });

  it("Test info message with no params", () => {
    const message = Utils.Strings.RandomString();
    logger.info(message);
    expect(info?.message).toBe(`[INFO] ${message}`);
    expect(info?.params).toBe(undefined);
  });

  it("Test info disable", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.WARNING
    });
    const message = Utils.Strings.RandomString();
    logger.info(message);
    expect(info?.message).toBe(undefined);
    expect(info?.params).toBe(undefined);
  });

  it("Test warn message and params", () => {
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.warn(message, params);
    expect(warn?.message).toBe(`[WARN] ${message}`);
    expect(warn?.params).toBe(JSON.stringify(params));
  });

  it("Test warn message with no params", () => {
    const message = Utils.Strings.RandomString();
    logger.warn(message);
    expect(warn?.message).toBe(`[WARN] ${message}`);
    expect(warn?.params).toBe(undefined);
  });

  it("Test warn disable", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.ERROR
    });
    const message = Utils.Strings.RandomString();
    logger.warn(message);
    expect(warn?.message).toBe(undefined);
    expect(warn?.params).toBe(undefined);
  });

  it("Test error message and params", () => {
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.error(message, params);
    expect(error?.message).toBe(`[ERROR] ${message}`);
    expect(error?.params).toBe(JSON.stringify(params));
  });

  it("Test error message with no params", () => {
    const message = Utils.Strings.RandomString();
    logger.error(message);
    expect(error?.message).toBe(`[ERROR] ${message}`);
    expect(error?.params).toBe(undefined);
  });

  it("Test error disable", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy)
    });
    const message = Utils.Strings.RandomString();
    logger.error(message);
    expect(error?.message).toBe(undefined);
    expect(error?.params).toBe(undefined);
  });

  it("Test fatal message and params", () => {
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.fatal(message, params);
    expect(fatal?.message).toBe(`[FATAL] ${message}`);
    expect(fatal?.params).toBe(JSON.stringify(params));
  });

  it("Test fatal message with no params", () => {
    const message = Utils.Strings.RandomString();
    logger.fatal(message);
    expect(fatal?.message).toBe(`[FATAL] ${message}`);
    expect(fatal?.params).toBe(undefined);
  });

  it("Test fatal disable", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy)
    });
    const message = Utils.Strings.RandomString();
    logger.fatal(message);
    expect(fatal?.message).toBe(undefined);
    expect(fatal?.params).toBe(undefined);
  });

  it("Test getInstance without options", () => {
    logger = Logger.getInstance();

    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.fatal(message, params);
    expect(fatal?.message).toBe(undefined);
    expect(fatal?.params).toBe(undefined);
  });

  it("Test new instance without options", () => {
    expect(() => {
      new Logger({} as any)
    }).toThrow("Logger strategy empty");
  });

  it("Test getInstance new instance", () => {
    logger = Logger.getInstance({
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.DEBUG,
      newInstance: true
    });

    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.debug(message, params);
    expect(debug?.message).toBe(`[DEBUG] ${message}`);
    expect(debug?.params).toBe(JSON.stringify(params));
  });

  it("Test Logger with no strategy", () => {
    expect(() => {
      new Logger({ breakline: true } as ILoggerOptions)
    }).toThrow("Logger strategy empty");
  });

  it("Test configure options", () => {
    const oldOptions: ILoggerOptions = {
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.DEBUG
    }
    const newOptions: ILoggerOptions = {
      strategy: new TestStrategy(strategy),
      level: ELoggerLevel.ERROR
    }
    expect(logger.getOptions()).toStrictEqual(oldOptions);
    logger.configure(newOptions);
    expect(logger.getOptions()).toStrictEqual(newOptions);
  });

  it("Test add prefix", () => {
    logger.addPrefix("[TEST] ");
    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.debug(message, params);
    expect(debug?.message).toBe(`[DEBUG] [TEST] ${message}`);
    expect(debug?.params).toBe(JSON.stringify(params));
  });

  it("Test getInstance using options without strategy for use default strategy", () => {
    jest.spyOn(console, 'debug').mockImplementation((message: string, params?: any) => {
      debug = { message, params };
    });

    logger = Logger.getInstance({
      level: ELoggerLevel.DEBUG
    } as any);

    const message = Utils.Strings.RandomString();
    const params = {
      key1: Utils.Strings.RandomString(),
      key2: Utils.Strings.RandomString()
    };
    logger.debug(message, params);
    expect(debug?.message).toBe(`[DEBUG] ${message}`);
    expect(debug?.params).toBe(JSON.stringify(params));
  });
});