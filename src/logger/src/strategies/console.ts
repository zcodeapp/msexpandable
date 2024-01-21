import { ILoggerStrategy } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class LoggerStrategyConsole implements ILoggerStrategy {

  public debug(message: string, params?: any) {
    console.debug(message, params);
  }

  public info(message: string, params?: any) {
    console.info(message, params);
  }

  public warn(message: string, params?: any) {
    console.warn(message, params);
  }

  public error(message: string, params?: any) {
    console.error(message, params);
  }

  public fatal(message: string, params?: any) {
    console.error(message, params);
  }
}