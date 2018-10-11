var command = {
  command: 'analyze',
  description: 'Run Mythril Platform on contracts',
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
      },{
        option: "--network <name>",
        description: "Specify the network to use, saving artifacts specific to that network. " +
          "Network name must exist\n                    in the configuration.",
      },{
        option: "--compile-all",
        description: "Compile all contracts instead of intelligently choosing which contracts need to " +
          "be compiled.",
      },{
        option: "--verbose-rpc",
        description: "Log communication between Truffle and the Ethereum client."
      },{
        option: "--interactive",
        description: "Prompt to confirm that the user wants to proceed after the dry run.",
      },
    ]
  },
  run: function (options, done) {
    console.log("Hello from truffle analyze");
  }
}

module.exports = command;
