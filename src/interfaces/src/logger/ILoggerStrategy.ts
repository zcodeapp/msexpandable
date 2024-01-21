/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoggerStrategy {
  debug(message: string, params?: any): void;
  info(message: string, params?: any): void;
  warn(message: string, params?: any): void;
  error(message: string, params?: any): void;
  fatal(message: string, params?: any): void;
}