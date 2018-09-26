'use strict';

const path = require('path');
const fs = require('fs');
const armlet = require('armlet');
const mythril = require('./mythril');
const trufstuf = require('./trufstuf');
const esReporter = require('./es-reporter');

function getFormatter(style) {
    const formatterName = style || 'stylish';
    try {
        return require(`eslint/lib/formatters/${formatterName}`);
    } catch (ex) {
        ex.message = `\nThere was a problem loading formatter option: ${style} \nError: ${
            ex.message
        }`;
        throw ex;
    }
}

/*  eslint no-unused-vars: 0 */ // for callback
var Analyze = {
  analyze: function(options, callback) {
    // console.log(require('util').inspect(options));
    const root_dir = options.working_directory;
    const buildDir = trufstuf.getBuildContractsDir(root_dir);
    const contractsDir = trufstuf.getContractsDir(root_dir);

    // Debug stuff
    // console.log(`Truffle project root: ${root_dir}`);
    // console.log(`Build directory is: ${buildDir}`);
    // console.log(`Contracts directory is: ${contractsDir}`);

    const buildJson = trufstuf.guessTruffleBuildJson(buildDir);
    const solidityFileBase = path.basename(buildJson, '.json');
    const solidityFile = path.join(contractsDir, solidityFileBase + '.sol');
    // console.log(`Solidity file is: ${solidityFile}`);

    let buildJsonPath = path.join(buildDir, buildJson);

    // console.log(`Reading ${buildJsonPath}`);
    let client = new armlet.Client(
      {
        apiKey: process.env.MYTHRIL_API_KEY,
        userEmail: process.env.MYTHRIL_API_KEY || 'bogus@example.com'
      });

    const buildObj = JSON.parse(fs.readFileSync(buildJsonPath, 'utf8'));

    client.analyze({bytecode: buildObj.deployedBytecode})
      .then(issues => {
	const formatter = getFormatter(options.style);
	let esIssues = mythril.issues2Eslint(issues, buildObj);
        // console.log(esIssues); // debug
        esReporter.printReport(esIssues, solidityFile, formatter, console.log);
      }).catch(err => {
        console.log(err);
      });
  }
};

module.exports = Analyze;
