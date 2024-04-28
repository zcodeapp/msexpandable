import { Injectable } from '@zcodeapp/di'
import { ICacheStrategy } from '@zcodeapp/interfaces'

@Injectable()
export class CacheTestStrategy implements ICacheStrategy {
  public async set(): Promise<void> {}

  public async get(): Promise<string> {
    return 'success mock'
  }
}
