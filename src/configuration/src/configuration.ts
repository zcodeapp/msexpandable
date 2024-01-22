import { Injectable } from "@zcodeapp/di";
import { IConfiguration, IConfigurationData, IConfigurationStrategy } from "@zcodeapp/interfaces";
import { Logger } from "@zcodeapp/logger";
import { EnvironmentStrategy } from "./strategies";

@Injectable()
export class Configuration implements IConfiguration {

  private _configurationData: IConfigurationData[] = [];
  private _configurationStrategies: IConfigurationStrategy[] = [];
    
  constructor(
    private readonly _logger: Logger,
    environmentStrategy: EnvironmentStrategy
  ) {
    this._logger.addPrefix("[Configuration] ");
    this._configurationStrategies.push(environmentStrategy);
  }

  public addStrategy(strategy: IConfigurationStrategy): void {
    this._logger.debug("Add strategy", { strategy });
    this._configurationStrategies.push(strategy);
  }

  public async load(): Promise<void> {
    this._logger.info("Try load strategies");
    this._logger.debug("List strategies", { strategies: this._configurationStrategies });
    await Promise.all(
      this._configurationStrategies.map(async configuration => {
        try {
          const data = await configuration.load();
          this._configurationData = [... this._configurationData, ... data];
          this._logger.info("Success load strategy", { strategy: configuration });
          this._logger.debug("Strategy", { strategy: configuration });
        } catch (ex) {
          this._logger.error("Error on try load strategy", { strategy: configuration, ex });
          throw ex;
        }
      })
    )
  }

  public get(key?: string): string {
    this._logger.debug("Try get value", { key });
    
    const data = this._configurationData.find(x => x.key == key);
    if (data) {
      this._logger.debug("Success get value", { key, data });
      return data.value;
    }

    this._logger.error("Erro on try get value", { key });
    return null;
  }

  public getData(): IConfigurationData[] {
    return this._configurationData;
  }
}