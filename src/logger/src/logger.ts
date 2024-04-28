import { ELoggerLevel, ILogger, ILoggerOptions } from '@zcodeapp/interfaces'
import { LoggerStrategyConsole } from './strategies'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Logger implements ILogger {
  static instance: ILogger

  static getInstance(options?: ILoggerOptions) {
    if (!options?.strategy) {
      options = {
        ...(options ?? {}),
        strategy: new LoggerStrategyConsole()
      }
    }
    if (options.newInstance) return new Logger(options)
    if (!this.instance) this.instance = new Logger(options)
    else if (options) this.instance.configure(options)
    return this.instance
  }

  constructor(private _options: ILoggerOptions) {
    if (!this._options || !this._options.strategy)
      throw new Error('Logger strategy empty')
  }

  public configure(options: ILoggerOptions) {
    this._options = options
  }

  public getOptions(): ILoggerOptions {
    return this._options
  }

  public addPrefix(prefix: string): void {
    this._options = {
      ...this._options,
      ...{ prefix: `${this._options.prefix ?? ''}${prefix}` }
    }
  }

  public debug(message: string, params?: any): void {
    if (this._options.level == ELoggerLevel.DEBUG)
      this._options.strategy.debug(
        `[DEBUG] ${this._options.prefix ?? ''}${message}`,
        JSON.stringify(params)
      )
  }

  public info(message: string, params?: any): void {
    if (this._options.level <= ELoggerLevel.INFORMATION)
      this._options.strategy.info(
        `[INFO] ${this._options.prefix ?? ''}${message}`,
        JSON.stringify(params)
      )
  }

  public warn(message: string, params?: any): void {
    if (this._options.level <= ELoggerLevel.WARNING)
      this._options.strategy.warn(
        `[WARN] ${this._options.prefix ?? ''}${message}`,
        JSON.stringify(params)
      )
  }

  public error(message: string, params?: any): void {
    if (this._options.level <= ELoggerLevel.ERROR)
      this._options.strategy.error(
        `[ERROR] ${this._options.prefix ?? ''}${message}`,
        JSON.stringify(params)
      )
  }

  public fatal(message: string, params?: any): void {
    if (this._options.level <= ELoggerLevel.FATAL)
      this._options.strategy.fatal(
        `[FATAL] ${this._options.prefix ?? ''}${message}`,
        JSON.stringify(params)
      )
  }
}
