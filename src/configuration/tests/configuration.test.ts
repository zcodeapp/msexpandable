import { IConfiguration } from '@zcodeapp/interfaces'
import { Configuration } from '../src'
import { Di } from '@zcodeapp/di'
import { Logger, LoggerStrategyConsole } from '@zcodeapp/logger'
import { SimpleStrategy } from './mock/configuration/strategy'
import { Utils } from '@zcodeapp/utils'
import { ExceptionStrategy } from './mock/configuration/exception'

describe('Configuration Test', () => {
  const di = Di.getInstance()
  let configuration: IConfiguration

  di.register(Logger, {
    factory: () => {
      return new Logger({
        strategy: new LoggerStrategyConsole()
      })
    }
  })

  beforeEach(() => {
    configuration = di.get(Configuration)
  })

  it('Test instance Configuration', () => {
    expect(configuration).toBeInstanceOf(Configuration)
  })

  it('Test load env strategy', async () => {
    await configuration.load()
    expect(configuration.get('NODE_ENV')).toBe(process.env.NODE_ENV)
  })

  it('Test add simple strategy', async () => {
    const key = Utils.Strings.RandomString()
    const value = Utils.Strings.RandomString()
    configuration.addStrategy(new SimpleStrategy(key, value))
    await configuration.load()
    expect(configuration.get(key)).toBe(value)
  })

  it('Test get key not found', () => {
    expect(configuration.get(Utils.Strings.RandomString())).toBeNull()
  })

  it('Test get all data', async () => {
    const key = Utils.Strings.RandomString()
    const value = Utils.Strings.RandomString()
    expect(configuration.getData().find((x) => x.key == key)).toBeUndefined()
    configuration.addStrategy(new SimpleStrategy(key, value))
    await configuration.load()
    expect(configuration.get(key)).toBe(value)
  })

  it('Test strategy exception', async () => {
    configuration.addStrategy(new ExceptionStrategy())
    expect(async () => {
      await configuration.load()
    }).rejects.toThrow('Exception for test')
  })
})
