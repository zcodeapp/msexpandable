import { ILoggerStrategy } from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class TestStrategy implements ILoggerStrategy {
  constructor(private mock: ILoggerStrategy) {}

  public debug(message: string, params?: any): void {
    this.mock.debug(message, params)
  }

  public info(message: string, params?: any): void {
    this.mock.info(message, params)
  }

  public warn(message: string, params?: any): void {
    this.mock.warn(message, params)
  }

  public error(message: string, params?: any): void {
    this.mock.error(message, params)
  }

  public fatal(message: string, params?: any): void {
    this.mock.fatal(message, params)
  }
}
