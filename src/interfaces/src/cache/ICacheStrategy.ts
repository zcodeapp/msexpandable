export interface ICacheStrategy {

  /**
   * Method for create/update cache
   *
   * @param string Key of cache
   * @param string value Value of cache
   * @returns Promise<void>
   */
  set(key: string, value: string): Promise<void>

  /**
   * Method for get value cache
   *
   * @param string key Key of cache
   * @returns Promise<string> Cache value if exists
   */
  get(key: string): Promise<string>
}
