import { ILoggerOptions, ILoggerStrategy } from ".";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILogger extends ILoggerStrategy {
  configure(options: ILoggerOptions): void;
  getOptions(): ILoggerOptions;
  addPrefix(prefix: string): void;
}