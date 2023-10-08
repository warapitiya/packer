# Assignment: Package Challenge

## Table of Content
 - [Assignment](docs/assignment.md)
 - Package Challenge Library
 - Problem
 - Streams
 - Commands


## Package Challenge Library

This package is designed to be an npm package. It is written in TypeScript with the help of libraries such as zod for validation and parsing, eslint to fix code style issues and problems in the code. The unit tests are written using Mocha as a test runner and Node's inbuilt assertion module. Lastly, c8 is used for code coverage reports.

The TypeScript compiler compiles the code to CommonJS files, and the `.npmignore` file is used to ignore necessary files when publishing the module to npm.

## Problem

The given problem is known as 0/1 Knapsack Problem. Please refer to the src/Knapsack.ts file for the solution.

## Streams

Given that this module requires the responsibility of reading a file, I made the decision to write the entire module as a series of streams that pipe to one another. This approach ensures that if the file provided is large, It will not become a performance bottleneck. This is because reading the file as a stream will read the file in smaller chunks, rather than in its entirety, thereby optimizing performance.

- src/stream-libs/split.ts: Split stream chunks to single lines.
- src/stream-libs/convert.ts: Convert the single line of data set to a Javascript Object.
- src/stream-libs/knapsack-stream.ts: Run the Knapsack algorithm for each dataset.

## Commands

### Unit tests

```shell
pnpm run test
```

### Unit tests + Coverage

```shell
pnpm run coverage
```

### Build

```shell
pnpm run build
```

