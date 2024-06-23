import { Di } from '@zcodeapp/di'
import { ICache } from '@zcodeapp/interfaces'
import { Cache, MemoryStrategy } from '../../src'
import { Utils } from '@zcodeapp/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Cache strategy Memory Test', () => {
  const di = Di.getInstance()
  let cache: ICache

  beforeEach(() => {
    cache = di.get(Cache)
    cache.changeStrategy(di.get(MemoryStrategy))
  })

  it('Test set/get value', async () => {
    const key = Utils.Strings.RandomString()
    const value1 = Utils.Strings.RandomString()
    await cache.set(key, value1)
    expect(await cache.get(key)).toBe(value1)
  })

  it('Test set/get undefined value', async () => {
    const key = Utils.Strings.RandomString()
    const value1 = undefined as any
    await cache.set(key, value1)
    expect(await cache.get(key)).toBe(value1)
  })

  it('Test set/get null value', async () => {
    const key = Utils.Strings.RandomString()
    const value1 = null as any
    await cache.set(key, value1)
    expect(await cache.get(key)).toBe(value1)
  })

  it('test overwrite using set', async () => {
    const key = Utils.Strings.RandomString()
    const value1 = Utils.Strings.RandomString()

    await cache.set(key, value1)
    expect(await cache.get(key)).toBe(value1)

    const value2 = Utils.Strings.RandomString()
    await cache.set(key, value2)
    expect(await cache.get(key)).toBe(value2)
  })

  it('Test get not found value has null', async () => {
    expect(await cache.get(Utils.Strings.RandomString())).toBe(null)
  })
})
