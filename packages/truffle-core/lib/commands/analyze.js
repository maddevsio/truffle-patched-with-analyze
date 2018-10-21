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
    usage: "truffle+analyze analyze [--mode={full|quick}] [--debug] [--style <eslint style name>] [*solidity-file*]",
    options: [
      {
        option: "--mode {",
        description: "Set analysis mode to be either quick (fast) or full (in depth)",
      },{
        option: "--debug",
        description: "Provide additional debug output",
      },{
        option: `--style {stylish |unix | visualstudio | table | codeframe | tap | ...}
See https://eslint.org/docs/user-guide/formatters/ for a full list.`,
        description: `Set output format in the given es-lint style format the migration file.`,
      },
    ]
  },
  run: TA.run
}

module.exports = command;
