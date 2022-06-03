const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
module.exports = compiled;


// // `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['Lottery.sol']) {
//     console.log(
//         contractName +
//         ': ' +
//         output.contracts['Lottery.sol'][contractName].evm.bytecode.object
//     );
// }