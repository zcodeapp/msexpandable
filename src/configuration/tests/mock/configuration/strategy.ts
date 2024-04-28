import {
  IConfigurationData,
  IConfigurationStrategy
} from '@zcodeapp/interfaces'

export class SimpleStrategy implements IConfigurationStrategy {
  constructor(
    private readonly key: string,
    private readonly value: string
  ) {}
  public async load(): Promise<IConfigurationData[]> {
    return [
      {
        key: this.key,
        value: this.value
      }
    ]
  }
}
