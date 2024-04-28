import { IConfigurationData } from '.'

export interface IConfigurationStrategy {
  load(): Promise<IConfigurationData[]>
}
