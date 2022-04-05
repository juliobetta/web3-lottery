const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      // arguments: ???,
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('has a manager', async () => {
    const message = await lottery.methods.manager().call();
    console.log(message)
    assert.ok(message);
    assert.equal(message, accounts[0]);
  });

  describe('with enter()', () => {
    let playerAccount;

    beforeEach(async () => {
      // create a player account
      playerAccount = accounts[1];
    });

    describe('when play enters with less than 1 wei', () => {
      it('rejects the transaction', async () => {
        try {
          await lottery.methods.enter().send({
            from: playerAccount,
            value: 0,
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });

    describe('when play enters with more than 1 wei', () => {
      it('accepts the transaction', async () => {
        try {
          await lottery.methods.enter().send({
            from: playerAccount,
            value: web3.utils.toWei('1', 'ether'),
          });
          assert(true);
        } catch (err) {
          assert(false);
        }
      });
    });
  });

  it('picks a winner', async () => {
    // create a player account
    const playerAccount01 = accounts[1];
    const playerAccount02 = accounts[2];

    // send 2 wei to the lottery to play 1 account
    await lottery.methods.enter().send({
      from: playerAccount01,
      value: web3.utils.toWei('2', 'wei'),
    });

    // send 2 wei to the lottery to play 2 account
    await lottery.methods.enter().send({
      from: playerAccount02,
      value: web3.utils.toWei('2', 'wei'),
    });

    const contractBalanceBefore = await lottery.methods.getBalance().call();
    assert.equal(contractBalanceBefore, web3.utils.toWei('4', 'wei'));

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    const contractBalanceAfter = await lottery.methods.getBalance().call();
    assert.equal(contractBalanceAfter, web3.utils.toWei('0', 'wei'));

    const player01Balance = await lottery.methods.getPlayerBalance(playerAccount01).call();
    const player02Balance = await lottery.methods.getPlayerBalance(playerAccount02).call();

    assert.notEqual(player01Balance, player02Balance);
  });
});
