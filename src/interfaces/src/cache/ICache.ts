import { ICacheStrategy } from './ICacheStrategy'

export interface ICache {
  changeStrategy(strategy: ICacheStrategy): void
  set(key: string, value: string): Promise<void>
  get(key: string): Promise<string>
}
