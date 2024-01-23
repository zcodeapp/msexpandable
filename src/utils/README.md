# Utils

[![Utils CI](https://github.com/zcodeapp/msexpandable/actions/workflows/utils-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/utils-workflow.yml) [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=utils)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Futils%2Fsrc)

## Overview

The `Utils` module provides a suite of handy functionalities for string manipulation and object transformation in TypeScript. Designed to be lightweight and efficient, this module is well-suited for common operations in web and Node.js development.

## Features

- String Manipulation: The Strings class within the Utils module offers powerful string manipulation capabilities. For instance, it can generate random strings of a specified length using a mix of alphabetic characters and numbers. This functionality is essential for creating unique identifiers, random tokens, or any scenario where random string generation is required.
- Object Transformation: The Transform class provides simple yet effective methods for object manipulation. A notable feature is the ability to clone objects, ensuring a deep copy without reference to the original object. This is particularly useful when dealing with complex data structures in TypeScript, where immutability and pure functions are essential.

## Installation

Include the `Utils` class in your TypeScript project:

```bash
npm install @zcodeapp/utils
```

## Usage

First, import the `Utils` class and other necessary interfaces:

```typescript
import { Utils } from "@zcodeapp/utils";

// generate random string with 100 chars
console.log(Utils.Strings.RandomString(100))

```

## API Reference

Strings Class

`Utils.Strings.RandomString(length: number = 10): string`
Generates a random string of the specified length. The default length is 10 characters.

Transform Class

`Utils.Transform.Clone<T, Y = T>(origin: T): Y`
Creates a deep clone of the provided object. This method is type-safe and can be used to clone complex objects and arrays.

`Utils.Transform.md5(key: string): string`
Returns a md5 of key value.

## Example

Here's a basic example of how to use the Utils module:

```typescript
import { Utils } from "@zcodeapp/utils";

// generate random string wirh 100 chars
console.log(Utils.Strings.RandomString(100))
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.