import { Di } from '@zcodeapp/di'
import { ICache } from '@zcodeapp/interfaces'
import { Cache, MemoryStrategy } from '../src'
import { Utils } from '@zcodeapp/utils'
import { CacheTestStrategy } from './mock/strategy'

describe('Cache Test', () => {
  const di = Di.getInstance()
  let cache: ICache

  beforeEach(() => {
    cache = di.get(Cache)
  })

  it('Test instance', () => {
    expect(cache).toBeInstanceOf(Cache)
  })

  it('Test set/get value from memory', async () => {
    const key = Utils.Strings.RandomString()
    const value = Utils.Strings.RandomString()
    await cache.set(key, value)
    expect(await cache.get(key)).toBe(value)
  })

  it('Test get from not found key', async () => {
    const key = Utils.Strings.RandomString()
    expect(await cache.get(key)).toBeNull()
  })

  it('Test change strategy', async () => {
    const key = Utils.Strings.RandomString()
    const value1 = Utils.Strings.RandomString()
    const value2 = Utils.Strings.RandomString()
    await cache.set(key, value1)
    expect(await cache.get(key)).toBe(value1)
    cache.changeStrategy(di.get(CacheTestStrategy))
    expect(await cache.get(key)).toBe('success mock')
    cache.changeStrategy(di.get(MemoryStrategy))
    await cache.set(key, value2)
    expect(await cache.get(key)).toBe(value2)
  })
})
