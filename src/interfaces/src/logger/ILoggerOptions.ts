import { ELoggerLevel, ILoggerStrategy } from '.'

export interface ILoggerOptions {
  strategy: ILoggerStrategy
  prefix?: string
  breakline?: boolean
  newInstance?: boolean
  level?: ELoggerLevel
}
