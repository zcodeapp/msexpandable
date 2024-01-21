# Di - Dependency Injection

[![Di CI](https://github.com/zcodeapp/msexpandable/actions/workflows/di-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/di-workflow.yml) [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=di)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fdi%2Fsrc)

## Overview

This module provides a lightweight and efficient implementation of dependency injection (DI) in TypeScript. It consists of three main components: `Di` (Dependency Injection container), `Inject` (decorator for dependency injection), and `Injectable` (decorator to mark a class as available for injection).

## Features

- Dependency Injection Container (Di): A centralized system to manage application dependencies, facilitating the creation and retrieval of service instances.
- Inject Decorator: Enables declarative dependency injection in classes, enhancing readability and keeping the code clean.
- Injectable Decorator: Marks a class as "injectable," making it manageable by the DI container. This simplifies the registration and resolution of dependencies.
- Instance Lifecycle Management: The module may offer control over the lifecycle of created instances, like singleton or request-scoped instances.
- Seamless TypeScript Integration: Designed to work seamlessly with TypeScript, providing strong typing and decorator support.
- Flexibility and Extensibility: Capable of adapting to various use cases and easily extendable to cater to specific project requirements.
- Enhanced Testability: Facilitates unit testing by allowing easy mock and stub integration, leading to more maintainable and testable code.

## Installation

Include the `Di` class in your TypeScript project:

```bash
npm install @zcodeapp/di
```

## Usage

First, import the `Di` class and other necessary interfaces:

```typescript
import { Di } from "@zcodeapp/di";
import { Example } from "example"

const di = Di.getInstance();
di.register(Example);
const instance = di.get(Example);

```

## API Reference

`Di`
The core of the DI system, responsible for creating and managing instances.

`Inject`
A decorator used to inject dependencies into a class.

`Injectable`
A decorator that marks a class as injectable, allowing it to be managed by the `Di` container.

## Example

Here's a basic example of how to use the DI module:

```typescript
import { Di, Injectable, Inject } from "@zcodeapp/di";

@Injectable()
class DependencyClass {}

@Injectable()
class ConsumerClass {
  constructor(private dependency: DependencyClass) {}
}

const di = Di.getInstance();
const instance = di.get(ConsumerClass);

```

## License

This project is licensed under the MIT License - see the LICENSE file for details.