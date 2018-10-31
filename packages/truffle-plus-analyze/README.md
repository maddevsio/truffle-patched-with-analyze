Truffle-plus-analyze is forked/patched version of Truffle.

*You will need Mythril credentials to run this. We expect to be giving a limited access
December and January. We will keep you posted [here](https://mythril.ai/api-key).*

Truffle is a development environment, testing framework and asset
pipeline for Ethereum, aiming to make life as an Ethereum developer
easier. With Truffle, you get:

* Built-in smart contract compilation, linking, deployment and binary management.
* Automated contract testing with Mocha and Chai.
* Configurable build pipeline with support for custom build processes.
* Scriptable deployment & migrations framework.
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication.
* Instant rebuilding of assets during development.
* External script runner that executes scripts within a Truffle environment.

### Install

```
$ npm install -g truffle-plus-analyze
```

### Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

```
$ truffle+analyze init
```

From there, you can run `truffle+analyze compile`, `truffle+analyze
migrate` and `truffle+analyze test` to compile your contracts, deploy
those contracts to the network, and run their associated unit tests.

Additionally you can run `truffle+analyze analyze` to run the Mythril
Platform to perform analyses. Some credential however need to be
set. That process is described elsewhere.

Truffle comes bundled with a local development blockchain server that
launches automatically when you invoke the commands above. If you'd
like to [configure a more advanced development
environment](http://truffleframework.com/docs/advanced/configuration)
we recommend you install the blockchain server separately by running
`npm install -g ganache-cli` at the command line.

+  [ganache-cli](https://github.com/trufflesuite/ganache-cli): a command-line version of Truffle's blockchain server.
+  [ganache](http://truffleframework.com/ganache/): A GUI for the server that displays your transaction history and chain state.


### Documentation

Please see the [Official Truffle Documentation](http://truffleframework.com/docs/) for guides, tips, and examples.

### Contributing

This package is a distribution package of the Truffle command line
tool. Please see
[truffle-core](https://github.com/trufflesuite/truffle-core) to
contribute to the main core code.

### License

MIT
