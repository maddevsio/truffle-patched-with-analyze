/* Main entry point for "truffle analyze".
   Handles option processing, kicks off armlet, and
   kicks off reporting when getting results.
*/
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

var Analyze = {
  analyze: function(options, callback) {
    if (options.help) {
      console.log(`usage: truffle analyze [options] [*solidity-file*]

runs Mythril Platform to on truffle project contract(s).

options:
    --style={stylish, unix, visualstudio, table}
            formats output according to a standard eslint style.
    --debug={true, false}
            Provide additional debug output

You can specify a solidity file which is assumed to be in the
"contracts" directory. If one is not specified, we'll try figure it
out ourselves.
`);
      return callback(null, [], []);
    }

    const root_dir = options.working_directory;
    const buildDir = trufstuf.getBuildContractsDir(root_dir);
    const contractsDir = trufstuf.getContractsDir(root_dir);

    // Debug stuff
    // console.log(require('util').inspect(options));
    // console.log(`Truffle project root: ${root_dir}`);
    // console.log(`Build directory is: ${buildDir}`);
    // console.log(`Contracts directory is: ${contractsDir}`);

    const buildJson = trufstuf.guessTruffleBuildJson(buildDir);
    var solidityFileBase;
    let solidityFile;
    let buildJsonPath

    try {

      if (options._.length === 0) {
	      solidityFileBase = path.basename(buildJson, '.json');
      } else {
	      solidityFileBase = options._[0];
      }

      if (! solidityFileBase.endsWith('.sol')) {
	      solidityFileBase += '.sol';
      }

      solidityFile = path.join(contractsDir, solidityFileBase);
      if (options.debug) {
        console.log(`Solidity file used: ${solidityFile}`);
      }
      buildJsonPath = path.join(buildDir, buildJson);

    } catch (err) {
      callback(err);
    }

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
	      let esIssues = mythril.issues2Eslint(issues, buildObj, options);
        // console.log(esIssues); // debug
        esReporter.printReport(esIssues, solidityFile, formatter, console.log);
        callback(null, [], []);
      }).catch(err => {
        callback(err);
      });
  }
};

module.exports = Analyze;
