import { IDiConstructor, IDiGetOptions, IDiOptions, TConstructor } from '.'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDi {
  /**
   * Method for update options of instance without new create
   *
   * @param _options Options for construct instance
   */
  updateOptions(_options: IDiConstructor): void

  /**
   * Method for register a dependency
   *
   * @param key Identification dependency
   * @param options Options for dependency
   */
  register<T>(key: TConstructor<T> | string, options?: IDiOptions): void

  /**
   * Method for add providers for dependency
   *
   * @param key Identification dependency
   * @param providers List providers for dependency
   */
  provider<T = any>(key: TConstructor<T>, providers: any[]): void

  /**
   * Method for get dependency
   *
   * @param key Identification dependency
   * @returns Instance or string|number|bool information
   */
  get<T>(key: TConstructor<T> | string, options?: IDiGetOptions): T
}
