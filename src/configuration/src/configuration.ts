import { Injectable } from "@zcodeapp/di";
import { IConfiguration, IConfigurationData, IConfigurationStrategy } from "@zcodeapp/interfaces";
import { Logger } from "@zcodeapp/logger";
import { EnvironmentStrategy } from "./strategies";

@Injectable()
export class Configuration implements IConfiguration {

  /**
   * Configurations data from strategies
   */
  private _configurationData: IConfigurationData[] = [];

  /**
   * Configuration strategies
   */
  private _configurationStrategies: IConfigurationStrategy[] = [];
  
  /**
   * Method for construct instance
   *
   * @param _logger Logger for application
   * @param environmentStrategy Default strategy for load env
   */
  constructor(
    private readonly _logger: Logger,
    environmentStrategy: EnvironmentStrategy
  ) {
    this._logger.addPrefix("[Configuration] ");
    this._configurationStrategies.push(environmentStrategy);
  }

  /**
   * Add new strategy for configuration
   *
   * @param strategy Instance of strategy
   * @returns void
   */
  public addStrategy(strategy: IConfigurationStrategy): void {
    this._logger.debug("Add strategy", { strategy });
    this._configurationStrategies.push(strategy);
  }

  /**
   * Method for load configurations from strategies
   * 
   * @returns void
   */
  public async load(): Promise<void> {
    this._logger.info("Try load strategies");
    this._logger.debug("List strategies", { strategies: this._configurationStrategies });
    await Promise.all(
      this._configurationStrategies.map(async configuration => {
        try {
          this._configurationData = [... this._configurationData, ... await configuration.load()];
          this._logger.info("Success load strategy", { strategy: configuration });
          this._logger.debug("Strategy", { strategy: configuration });
        } catch (ex) {
          this._logger.error("Error on try load strategy", { strategy: configuration, ex });
          throw ex;
        }
      })
    )
  }

  /**
   * Method for get key value
   *
   * @param key Key get value
   * @returns Key value
   */
  public get(key: string): string {
    this._logger.debug("Try get value", { key });
    
    const data = this._configurationData.find(x => x.key == key);
    if (data) {
      this._logger.debug("Success get value", { key, data });
      return data.value;
    }

    this._logger.error("Erro on try get value", { key });
    return null;
  }

  /**
   * Method to get all configurations
   *
   * @returns List of configurations
   */
  public getData(): IConfigurationData[] {
    return this._configurationData;
  }
}