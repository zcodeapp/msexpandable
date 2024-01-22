import { IConfigurationData, IConfigurationStrategy } from "@zcodeapp/interfaces";

export class ExceptionStrategy implements IConfigurationStrategy {
  public async load(): Promise<IConfigurationData[]> {
    throw new Error("Exception for test");
  }
}