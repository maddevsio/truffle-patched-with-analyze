const command = {
  command: 'analyze',
  description: 'Run Mythril Platform analysis',
  builder: {},
  run: function (options, done) {
    const Config = require("truffle-config");
    const Analyze = require("../analyze/main");
    const config = Config.detect(options);
    Analyze.analyze(config, done);
  }
}

module.exports = command;
