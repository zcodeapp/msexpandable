import { IConfigurationData } from "./IConfigurationData";
import { IConfigurationStrategy } from "./IConfigurationStrategy";

export interface IConfiguration {
  addStrategy(strategy: IConfigurationStrategy): void;
  load(): Promise<void>;
  get(key: string): string;
  getData(): IConfigurationData[];
}