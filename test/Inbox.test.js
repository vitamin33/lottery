const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

const INITIAL_MESSAGE = 'Hi, there!';

let accounts;
let inbox;

beforeEach(async () => {
   //get a list of all accounts
    accounts = await web3.eth.getAccounts();

   //use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi, there!']
        })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a smart contract', () => {
        assert.ok(inbox.options.address);
    });

    it('inital message exists', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change message', async () => {
        await inbox.methods.setMessage('Bye!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye!');
    })
});