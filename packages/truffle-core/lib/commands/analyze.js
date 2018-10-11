const TA = require("../../../truffle-analyze");
var command = {
  command: 'analyze',
  description: 'Run Mythril Platform on contracts',
  builder: {
    "compile-all": {
      describe: "recompile all contracts",
      type: "boolean",
      default: false
    },
  },
  help: {
    usage: "truffle analyze [--debug] [--style <eslint style name>] [*solidity-file*]",
    options: [
      {
        option: "--debug",
        description: "Provide additional debug output",
      },{
        option: "--style {stylish |unix | visualstudio | table}",
        description: `Set output format in the given es-lint style format \
        the migration file.`,
      },
    ]
  },
  run: TA.run
}

module.exports = command;
