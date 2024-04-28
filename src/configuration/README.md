# Configuration

[![Configuration CI](https://github.com/zcodeapp/msexpandable/actions/workflows/configuration-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/configuration-workflow.yml) [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=configuration)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fconfiguration%2Fsrc)

## Overview

The `Configuration` library is a robust and flexible solution for configuration management in TypeScript applications. It allows for the integration of multiple configuration strategies, facilitating adaptability across different environments and scenarios. With support for asynchronous loading and customizable strategies, this library is ideal for projects requiring an extensible and reliable configuration system.

## Features

`Customizable Configuration Strategies`
Integrate different configuration sources using customizable strategies.

`Asynchronous Loading`
Supports asynchronous loading of configuration data.

`Extensive Logging`
Comes with built-in logging capabilities for monitoring the configuration loading and retrieval process.

`Scalable and Extendable`
Easily scalable for complex applications, allowing the addition of new configuration strategies as needed.

`Error Handling`
Robust error handling during the configuration loading process.

## Installation

Include the `Configuration` class in your TypeScript project:

```bash
npm install @zcodeapp/configuration @zcodeapp/logger
```

## Usage

To use the `Configuration` class in your TypeScript project:

```typescript
import { Di } from "@zcodeapp/di";
import { ExampleStrategy } from "exampleStrategy";
import { Configuration } from "@zcodeapp/configuration";

const di = Di.getInstance();

const config = di.get(Configuration);

const node_env = config.get("NODE_ENV");
```

## API Reference

`addStrategy(strategy: IConfigurationStrategy): void`
Add a new configuration strategy.

`load(): Promise<void>`
Asynchronously load configuration data using the added strategies.

`get(key?: string): string`
Retrieve a specific configuration value by key.

`getData(): IConfigurationData[]`
Get all loaded configuration data.

## Example

### Using without dependency injection

exampleStrategy.ts
```typescript
export class ExampleStrategy implements IConfigurationStrategy {
  public async load(): Promise<IConfigurationData[]> {
    // load github, azure, gcp ...
  }
}
```

main.ts
```typescript
import { Configuration, EnvironmentStrategy } from "@zcodeapp/configuration";
import { Logger } from "@zcodeapp/logger";

// Get env values
const config = new Configuration(Logger.getInstance(), new EnvironmentStrategy());
const node_env = config.get("NODE_ENV");
```

### Using with dependency injection `@zcodeapp/di`

exampleStrategy.ts
```typescript
import { Injectable } from "@zcodeapp/di";

@Injectable()
export class ExampleStrategy implements IConfigurationStrategy {
  public async load(): Promise<IConfigurationData[]> {
    // load github, azure, gcp ...
    // return IConfigurationData[]
  }
}
```

main.ts
```typescript
import { Di } from "@zcodeapp/di";
import { ExampleStrategy } from "exampleStrategy";
import { Configuration } from "@zcodeapp/configuration";

const di = Di.getInstance();

const config = di.get(Configuration);
config.addStrategy(di.get(ExampleStrategy));

const custom_value = config.get("CUSTOM_VALUE");
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.


