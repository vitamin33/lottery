const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const MNEMONIC = 'paste your mnemonic here';

const provider = new HDWalletProvider(
    MNEMONIC,
    'https://rinkeby.infura.io/v3/152bdfcd5e5b470aa1fada09eac9155d'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to: ', result.options.address);

    provider.engine.stop();
};

deploy();