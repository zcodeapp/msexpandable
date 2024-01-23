import { Injectable } from "@zcodeapp/di";
import { ICache, ICacheStrategy } from "@zcodeapp/interfaces";
import { Logger } from "@zcodeapp/logger";
import { MemoryStrategy } from "./strategies/memory";

@Injectable()
export class Cache implements ICache {

  private _cacheStrategy: ICacheStrategy;

  constructor(
    private readonly _logger: Logger,
    cacheStrategy: MemoryStrategy
  ) {
    this._cacheStrategy = cacheStrategy;
    this._logger.addPrefix("[Cache] ");
  }

  public changeStrategy(strategy: ICacheStrategy): void {
    this._logger.debug("Add strategy", { strategy });
    this._cacheStrategy = strategy;
  }

  public async set(key: string, value: string): Promise<void> {
    await this._cacheStrategy.set(key, value);
  }

  public async get(key: string): Promise<string> {
    const data = await this._cacheStrategy.get(key);
    return data ?? null;
  }
}