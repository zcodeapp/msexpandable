import { Injectable } from "@zcodeapp/di";
import { IConfigurationData, IConfigurationStrategy } from "@zcodeapp/interfaces";

@Injectable()
export class EnvironmentStrategy implements IConfigurationStrategy {

  /**
   * Method for load env from system
   *
   * @returns List of envs
   */
  public async load(): Promise<IConfigurationData[]> {
    return Object.entries(process.env).map(([key, value]) => ({
      key,
      value
    }));
  }
}