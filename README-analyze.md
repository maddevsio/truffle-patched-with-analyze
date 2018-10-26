Introduction
------------

This is a forked version of truffle "next" (as of v5 beta), which adds Mythril Platform.

The specific analyze function is pulled in as a git submodule in the github private consensys/truffle-analyze repo

Developer Setup
---------------


If you clone this to get the submodules in place:

```console
$ git submodule init`
$ git submodule update --remote
$ npm init
$ cd packages/truffle-core
$ npm init
$ npm install seedrandom
$ npm install bip39
```

I don't think `seedrandom` and `bip39` should be included in
`truffle-core/packages.json`. It think we are working around
missing dependencies from other packages.


Building a package
------------------

Clone the repo. See below for how to do that.

run:

```
$ cd packages/truffle-plus-analyze
$ yarn build
$ npm pack
```
