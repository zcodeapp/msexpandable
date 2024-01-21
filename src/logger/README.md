# Logger

## Overview

This TypeScript `Logger` class is part of the `@zcodeapp` packages. It offers a flexible logging system with support for different logging strategies and levels.

## Features

- Singleton pattern with `getInstance` method.
- Configurable logging levels (DEBUG, INFO, WARN, ERROR, FATAL).
- Customizable logging strategies.
- Prefix addition to log messages.

## Installation

Include the `Logger` class in your TypeScript project:

```bash
npm install @zcodeapp/logger
```

## Usage

First, import the `Logger` class and other necessary interfaces:

```typescript
import { Logger, ELoggerLevel, ILoggerOptions, LoggerStrategyConsole } from "@zcodeapp/interfaces";
```

Then, configure and use the logger:

```typescript
// Configure Logger
const loggerOptions: ILoggerOptions = {
  level: ELoggerLevel.DEBUG,
  strategy: new LoggerStrategyConsole(),
  // other options...
};
const logger = Logger.getInstance(loggerOptions);

// Use Logger
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message");
logger.fatal("Fatal message");

```

## API Reference

`Logger.getInstance(options?: ILoggerOptions): ILogger`
Returns a singleton instance of the Logger. If options is provided, it configures the logger accordingly.

`configure(options: ILoggerOptions): void`
Configures the logger with the given options.

`getOptions(): ILoggerOptions`
Returns the current logger options.

`addPrefix(prefix: string): void`
Adds a prefix to all log messages.

### Logging Methods

- `debug(message: string, params?: any): void`
- `info(message: string, params?: any): void`
- `warn(message: string, params?: any): void`
- `error(message: string, params?: any): void`
- `fatal(message: string, params?: any): void`

### `ILoggerOptions` Reference

`ILoggerOptions` is an interface that provides various configuration options for the Logger. Below are the details of each option available:

- `level` (ELoggerLevel): This option sets the logging level for the logger. The available levels are:
  - `DEBUG`: Logs detailed information, primarily useful for developers.
  - `INFORMATION`: Logs informative messages that highlight the progress of the application.
  - `WARNING`: Logs potentially harmful situations.
  - `ERROR`: Logs error events that might still allow the application to continue running.
  - `FATAL`: Logs severe error events that presumably lead the application to abort.

- `strategy`: Defines the strategy for logging messages. This can be an instance of any class that implements the logging strategy, like `LoggerStrategyConsole`. The strategy default determines how and where the log messages are outputted.

- `prefix` (string): An optional string that is prepended to every log message. This is useful for tagging logs with specific identifiers like module names or environment names.

- `newInstance` (boolean): An optional flag to create a new logger instance instead of using the singleton pattern. By default, `Logger` uses a singleton pattern, and this flag is set to `false`.

## Example

Here's an example of how to configure the `Logger` with `ILoggerOptions`:

```typescript
const options: ILoggerOptions = {
  level: ELoggerLevel.DEBUG,
  strategy: new LoggerStrategyConsole(),
  prefix: "MyApp",
  newInstance: true
};

const logger = Logger.getInstance(options);
logger.info("Application started");
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.