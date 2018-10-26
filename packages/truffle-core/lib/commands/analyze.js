const TA = require("../../../truffle-analyze");
var command = {
  command: 'analyze',
  description: 'Run Mythril Platform analyses on a contract',
  help: {
    usage: "truffle+analyze analyze [--mode={full|quick}] [--debug] [--style *eslint-style-name*] [*contract-name*]",
    options: [
      {
        option: "--mode {",
        description: "Set analysis mode to be either quick (fast) or full (in depth)",
      },{
        option: "--debug",
        description: "Provide additional debug output",
      },{
        option: `--style {stylish | unix | visualstudio | table | tap | ...}`,
        description: 'Set output format in the given es-lint style format the migration file. ' +
          'See https://eslint.org/docs/user-guide/formatters/ for a full list.'
      },
    ]
  },
  run: TA.run
}

module.exports = command;
