Truffle-plus-analyze is forked/patched version of Truffle. It adds
an "analyze" command to run check for security weaknesses and
vulnerabilities via the [Mythril Platform](https://mythril.ai).

*You will need Mythril credentials to run this. We expect to be giving a limited access
December and January. We will keep you posted [here](https://mythril.ai/api-key).*

Truffle is a development environment, testing framework and asset
pipeline for Ethereum, aiming to make life as an Ethereum developer
easier. Read about truffle [here](https://truffleframework.com/docs/truffle/overview).

### Install

```
$ npm install -g truffle-plus-analyze
```

### Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

```
$ truffle+analyze init
```

From there, you can run `truffle+analyze analyze`, `truffle+analyze
migrate` and `truffle+analyze test` to compile and analyze your contracts, deploy
those contracts to the network, and run their associated unit tests.

However some credentials need to be set to run `truffle+analyze analyze`. That process is described elsewhere.

### See also:

[Truffle 5.0.0-beta.1](https://www.npmjs.com/package/truffle/v/5.0.0-beta.1).

### License

MIT
