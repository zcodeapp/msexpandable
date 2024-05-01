# Cache

[![Cache CI](https://github.com/zcodeapp/msexpandable/actions/workflows/cache-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/cache-workflow.yml) [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=cache)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fcache%2Fsrc)

## Overview

The `Cache` module is a part of the `@zcodeapp` framework, designed to provide a flexible caching mechanism for applications. It leverages dependency injection and interfaces from the framework to create a versatile and extensible caching system. The module includes a basic `MemoryStrategy` for caching, but is built to accommodate different caching strategies.

## Features

`Flexible Caching Strategy`
The Cache class allows for changing the caching strategy at runtime, providing flexibility in how data is cached.

`Memory-Based Caching`
Includes a default MemoryStrategy for in-memory caching, suitable for scenarios where quick access to data is required and persistence is not a concern.

`MD5 Key Transformation`
Utilizes MD5 hashing for keys, ensuring consistent key formatting and potentially reducing the risk of key collisions.

`Simple API`
Offers a straightforward API with set and get methods for storing and retrieving data.

`Logging Integration`
Integrates with the @zcodeapp/logger for logging activities, aiding in debugging and monitoring.

## Installation

Include the `Cache` class in your TypeScript project:

```bash
npm install @zcodeapp/cache
```

## Usage

```typescript
import { Di } from '@zcodeapp/di';
import { Cache } from '@zcodeapp/cache';

const di = Di.getInstance();
const cache = di.get(Cache);

await cache.set('myKey', 'myValue');

const value = await cache.get('myKey');
```

## API Reference

`Cache Class`

- `constructor(logger: Logger, cacheStrategy: MemoryStrategy)`: Initializes the cache with a logger and a caching strategy.
- `changeStrategy(strategy: ICacheStrategy): void`: Changes the caching strategy at runtime.
- `async set(key: string, value: string): Promise<void>`: Stores a value in the cache.
- `async get(key: string): Promise<string>`: Retrieves a value from the cache.

`MemoryStrategy Class`

- `async set(key: string, value: string): Promise<void>`: Stores a value in memory.
- `async get(key: string): Promise<string>`: Retrieves a value from memory.

## Example

exampleStrategy.ts
```typescript
import { Injectable } from "@zcodeapp/di";
import { ICacheStrategy } from "@zcodeapp/interfaces";

@Injectable()
export class ExampleStrategy implements ICacheStrategy {
    public async set(key: string, value: string): Promise<void> {
      // your code...
    }

    public async get(key: string): Promise<string> {
      // your code...
    }
}
```

main.ts
```typescript
import { Di } from '@zcodeapp/di';
import { Cache } from '@zcodeapp/cache';
import { ExampleStrategy } from 'exampleStrategy';

const di = Di.getInstance();
const cache = di.get(Cache);
cache.changeStrategy(di.get(ExampleStrategy));

await cache.set('myKey', 'myValue');

const value = await cache.get('myKey');
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
