import { Injectable } from "@zcodeapp/di";
import { IConfigurationData, IConfigurationStrategy } from "@zcodeapp/interfaces";

@Injectable()
export class EnvironmentStrategy implements IConfigurationStrategy {
  public async load(): Promise<IConfigurationData[]> {
    return Object.entries(process.env).map(([key, value]) => ({
      key,
      value
    }));
  }
}