const srcmap = require('./srcmap.js');

exports.print = console.log;

/*
The eslint report format which we use, has these fields:
   line, column, severity, message, ruleId

but a Mythril JSON report has these fields:
   address, type, description, contract, function,

Convert a Mythril issue into an ESLint-style issue

*/
exports.MythrilIssue2EsLint = function (issue) {

  // FIXME: turn an EVM bytecode address into a line and column number(s)
  function addr2lineColumn(address) {
    // uses lineCol map.
    return {line: 5, column: 6};
  }

  const myth2Severity = {
    Informational: 3,
    Information: 3,
  }

  const myth2EslintField = {
    type: 'severity',
    address: addr2lineColumn,  // FIXME bind to fn with lineColMap
    description: 'message',
  }

  let esIssue = {};
  for (let field of Object.keys(myth2EslintField)) {
    let esField = myth2EslintField[field];
    let value = issue[field];
    if (esField === addr2lineColumn) {
      let lineCol = esField(value)
      esIssue.line = lineCol.line;
      esIssue.column = lineCol.column;
    } else if (esField === 'severity') {
      esIssue[esField] = myth2Severity[value];
    } else if (esField === 'message') {
      // Mythril messages are long. Strip after first period.
      let sentenceEnd = value.indexOf('. ');
      if (sentenceEnd != -1) {
        value = value.slice(0, sentenceEnd+2);
      }
      esIssue[esField] = value;
    }
    esIssue.ruleId = 'Mythril'
  }
  return esIssue;
};

exports.printMythrilIssue = function (issue) {
  const fields = ['type', 'contract', 'function', 'code', 'address', 'description'];
  for (let field of fields) {
    if (issue[field]) {
      exports.print(`${field}: ${issue[field]}`);
    }
  }
};

exports.parseMythrilOutput = function (issues, buildObj) {
  // FIXME: we are using remix for parsing which uses
  // a different AST format than truffle's JSON.
  // For now we'll compile the contract.

  let output = srcmap.compileContract(buildObj.source);
  let ast = output.sources['test.sol'];
  console.log(ast);

  let legacyAST = buildObj.legacyAST;
  console.log(legacyAST);

  let sourceMap = buildObj.deployedSourceMap;
  for (let issue of issues) {
    let node = srcmap.isVariableDeclaration(issue.address, sourceMap, ast);
    if (node && srcmap.isDynamicArray(node)) {
      exports.print('Ignoring Mythril issue around ' +
		    'dynamically allocated array');
    } else {
      exports.printMythrilIssue(issue);
    }
  }
};
