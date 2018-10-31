const TA = require("../../../truffle-analyze");
var command = {
  command: 'analyze',
  description: 'Run Mythril Platform analyses on a contract',
  help: {
    usage: `truffle+analyze analyze [options]`,

    options: [
      // {
      //   option: '--mode {full | quick}',
      //   description: "Set analysis mode to be either quick (fast) or full (in depth)",
      // },
      {
        option: '--debug',
        description: 'Provide additional debug output',
      },{
        option: `--style {stylish | unix | visualstudio | table | tap | ...}`,
        description: 'Report format in given es-lint style style.\n' +
          '                    See https://eslint.org/docs/user-guide/formatters/ for a full list.'
      },{
        option: '--timeout *seconds* ',
        description: 'Limit Mythril Platform analysis time to *s* seconds.\n' +
          '                    The default is 30 seconds.',
      },
    ]
  },
  run: TA.run
}

module.exports = command;
