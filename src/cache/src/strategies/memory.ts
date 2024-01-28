import { Injectable } from "@zcodeapp/di";
import { ICacheStrategy, IMemoryData } from "@zcodeapp/interfaces";

@Injectable()
export class MemoryStrategy implements ICacheStrategy {

  /**
   * Local memory storage
   */
  private _memoryData: IMemoryData[] = [];

  /**
   * Method for create/update cache
   *
   * @param key Key of cache
   * @param value Value of cache
   */
  public async set(key: string, value: string): Promise<void> {
    const index = this._memoryData.findIndex(x => x.key == key);

    const payload = {
      key,
      value
    };

    if (index > -1)
      this._memoryData[index] = payload;
    else
      this._memoryData.push(payload);
  }

  /**
   * Method for get value cache
   *
   * @param key Key of cache
   * @returns Cache value if exists
   */
  public async get(key: string): Promise<string> {
    const data = this._memoryData.find(x => x.key == key);
    if (data)
      return data.value;
    return null;
  }
}