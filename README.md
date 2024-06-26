# Microservice expandable

| Package | Version | Build | Coverage |
| ------- | ------- | ----- | -------- |
| All     | ------- | ----- | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src) |
| [@zcodeapp/interfaces](src/interfaces) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/interfaces.svg)](https://www.npmjs.com/package/@zcodeapp/interfaces) | [![Di CI](https://github.com/zcodeapp/msexpandable/actions/workflows/interfaces-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/interfaces-workflow.yml) | --- |
| [@zcodeapp/logger](src/logger) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/logger.svg)](https://www.npmjs.com/package/@zcodeapp/logger) | [![Logger CI](https://github.com/zcodeapp/msexpandable/actions/workflows/logger-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/logger-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=logger)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Flogger%2Fsrc) |
| [@zcodeapp/di](src/di) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/di.svg)](https://www.npmjs.com/package/@zcodeapp/di) | [![Di CI](https://github.com/zcodeapp/msexpandable/actions/workflows/di-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/di-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=di)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fdi%2Fsrc) |
| [@zcodeapp/utils](src/utils) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/utils.svg)](https://www.npmjs.com/package/@zcodeapp/utils) | [![Utils CI](https://github.com/zcodeapp/msexpandable/actions/workflows/utils-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/utils-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=utils)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Futils%2Fsrc) |
| [@zcodeapp/configuration](src/configuration) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/configuration.svg)](https://www.npmjs.com/package/@zcodeapp/configuration) | [![Configuration CI](https://github.com/zcodeapp/msexpandable/actions/workflows/configuration-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/configuration-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=configuration)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fconfiguration%2Fsrc) |
| [@zcodeapp/cache](src/cache) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/cache.svg)](https://www.npmjs.com/package/@zcodeapp/cache) | [![Cache CI](https://github.com/zcodeapp/msexpandable/actions/workflows/cache-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/cache-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=cache)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fcache%2Fsrc) |
| [@zcodeapp/controller](src/controller) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/controller.svg)](https://www.npmjs.com/package/@zcodeapp/controller) | [![Controller CI](https://github.com/zcodeapp/msexpandable/actions/workflows/controller-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/controller-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=controller)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fcontroller%2Fsrc) |
| [@zcodeapp/validation](src/validation) | [![npm version](https://img.shields.io/npm/v/@zcodeapp/validation.svg)](https://www.npmjs.com/package/@zcodeapp/validation) | [![Validation CI](https://github.com/zcodeapp/msexpandable/actions/workflows/validation-workflow.yml/badge.svg?branch=main)](https://github.com/zcodeapp/msexpandable/actions/workflows/validation-workflow.yml) | [![codecov](https://codecov.io/gh/zcodeapp/msexpandable/branch/main/graph/badge.svg?token=ZHJHX9L0CN&flag=validation)](https://app.codecov.io/gh/zcodeapp/msexpandable/tree/main/src%2Fvalidation%2Fsrc) |



# Development using Debian/Ubuntu

Needs Docker installed. For install see [Docker docs](https://docs.docker.com/engine/install/).

## Host commands

Build Docker Images and Install Application.

```bash
bin/docker/host/install
```

Nodejs Client

```bash
bin/docker/host/client
```

## Docker Container commands

Build Application

```bash
bin/docker/client/build
```

Clean Application

```bash
bin/docker/client/clean
```

Install Application

```bash
bin/docker/client/install
```

Publish Application packages

```bash
bin/docker/client/publish
```

Test Application

```bash
bin/docker/client/test
```