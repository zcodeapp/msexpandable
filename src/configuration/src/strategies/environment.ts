import { Injectable } from "@zcodeapp/di";
import { IConfigurationData } from "@zcodeapp/interfaces";

@Injectable()
export class EnvironmentStrategy {
  public async load(): Promise<IConfigurationData[]> {
    return Object.entries(process.env).map(([key, value]) => ({
      key,
      value
    }));
  }
}