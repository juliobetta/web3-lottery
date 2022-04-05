const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
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

module.exports = (() => {
  try {
    const parsed = JSON.parse(solc.compile(JSON.stringify(input)));

    if (parsed.errors) {
      throw new Error(parsed.errors.map(error => JSON.stringify(error, null, 2)).join('\n'));
    }

    return parsed.contracts['Lottery.sol'].Lottery;
  } catch(err) {
    console.error(err);
  }
})();
