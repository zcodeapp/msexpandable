import { Injectable } from "@zcodeapp/di";
import { ICache, ICacheStrategy } from "@zcodeapp/interfaces";
import { Logger } from "@zcodeapp/logger";
import { MemoryStrategy } from "./strategies/memory";
import { Utils } from "@zcodeapp/utils";

@Injectable()
export class Cache implements ICache {

  /**
   * Cache strategy
   */
  private _cacheStrategy: ICacheStrategy;

  /**
   * Method for construct instance
   *
   * @param _logger Instance of Logger
   * @param cacheStrategy Strategy for use
   */
  constructor(
    private readonly _logger: Logger,
    cacheStrategy: MemoryStrategy
  ) {
    this._cacheStrategy = cacheStrategy;
    this._logger.addPrefix("[Cache] ");
  }

  /**
   * Method for change strategy
   *
   * @param strategy Instance of strategy
   */
  public changeStrategy(strategy: ICacheStrategy): void {
    this._logger.debug("Add strategy", { strategy });
    this._cacheStrategy = strategy;
  }

  /**
   * Method for create/update cache
   *
   * @param key Key of cache
   * @param value Value of cache
   */
  public async set(key: string, value: string): Promise<void> {
    key = Utils.Transform.md5(key);
    await this._cacheStrategy.set(key, value);
  }

  /**
   * Method for get value cache
   *
   * @param key Key of cache
   * @returns Cache value if exists
   */
  public async get(key: string): Promise<string> {
    key = Utils.Transform.md5(key);
    const data = await this._cacheStrategy.get(key);
    return data;
  }
}