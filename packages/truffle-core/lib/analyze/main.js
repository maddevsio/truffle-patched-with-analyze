const path = require('path')
const fs = require('fs')
const armlet = require('armlet')
const trufstuf = require('./trufstuf');
const srcmap = require('./srcmap.js')

function CommandBuilder(command) {
  this.command = command;
};

var Analyze = {
  analyze: function(options, callback) {
    console.log("analyze called")
    // console.log(require('util').inspect(options));
    const root_dir = options.working_directory
    const buildDir = trufstuf.getBuildContractsDir(root_dir)
    const contractsDir = trufstuf.getContractsDir(root_dir)
    console.log(`Truffle project root: ${root_dir}`)
    console.log(`Build directory is: ${buildDir}`)
    console.log(`Contracts directory is: ${contractsDir}`)

    const buildJson = trufstuf.guessTruffleBuildJson(buildDir)
    const solidityFileBase = path.basename(buildJson, '.json')
    const solidityFile = path.join(contractsDir, solidityFileBase + '.sol')
    console.log(`Solidity file is: ${solidityFile}`)

    let buildJsonPath = path.join(buildDir, buildJson)
    console.log(`Reading ${buildJsonPath}`)
    let client = new armlet.Client(
      {
	apiKey: process.env.MYTHRIL_API_KEY,
	userEmail: process.env.MYTHRIL_API_KEY || 'bogus@example.com'
      })

    const buildObj = JSON.parse(fs.readFileSync(buildJsonPath, 'utf8'))

    client.analyze({bytecode: buildObj.deployedBytecode})
      .then(issues => {
	exports.parseMythrilOutput(issues, buildObj)
	// console.log(issues)
      }).catch(err => {
	console.log(err)
      })
  }
}

exports.parseMythrilIssue = function (issue) {
  const fields = ['type', 'contract', 'function', 'code', 'address', 'description']
  for (let i in fields) {
    let field = fields[i]
    if (issue[field]) {
      console.log(`${field}: ${issue[field]}`)
    }
  }
}

exports.parseMythrilOutput = function (issues, buildObj) {
  // FIXME: we are using remix for parsing which uses
  // a different AST format than truffle's JSON.
  // For now we'll compile the contract.

  let output = srcmap.compileContract(buildObj.source)
  let ast = output.sources['test.sol']
  console.log(ast)

  let legacyAST = buildObj.legacyAST
  console.log(legacyAST)

  let sourceMap = buildObj.deployedSourceMap
  for (let i in issues) {
    let issue = issues[i]
    let node = srcmap.isVariableDeclaration(issue.address, sourceMap, ast)
    if (node && srcmap.isDynamicArray(node)) {
      console.log(`skipping issue around dynamic array`)
    } else {
      parseMythrilIssue(issue)
    }
  }
}


module.exports = Analyze;
