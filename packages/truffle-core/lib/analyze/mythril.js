const srcmap = require('./srcmap.js');

exports.print = console.log;

exports.parseMythrilIssue = function (issue) {
    const fields = ['type', 'contract', 'function', 'code', 'address', 'description'];
    for (let i in fields) {
        let field = fields[i];
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
    for (let i in issues) {
        let issue = issues[i];
        let node = srcmap.isVariableDeclaration(issue.address, sourceMap, ast);
        if (node && srcmap.isDynamicArray(node)) {
            exports.print('Ignoring Mythril issue around ' +
   'dynamically allocated array');
        } else {
            exports.parseMythrilIssue(issue);
        }
    }
};
