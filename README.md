# Local testing of Atlas Search-based Features

This repository demonstrates how you can use test containers to test Atlas Search-based queries in a local setup.

If you want to learn more, you can read "How to enable local and automatic testing of Atlas Search-based Features" on the [MongoDB Developer platform](https://www.mongodb.com/developer/).

## Prerequisites

- Docker
- Docker Compose
- Node.js
- yarn

## How to run

```bash
yarn
yarn test
```

- The `yarn` command downloads all the dependencies (npm install equivalent).
- The command `yarn test` starts the docker containers, and runs the test.

## Credit

Check out the [source repository](https://github.com/dxfrontiers/atlas-search-local-testing).

