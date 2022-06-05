const Web3 = require("web3");
//let Tx  = require("ethereumjs-tx").Transaction;
const Tx  = require("@ethereumjs/tx").Transaction;
//let Common = require("@ethereumjs/common").Chain;

//import { Transaction} from '@ethereumjs/tx';
require('dotenv').config();
const privatekey = Buffer.from(process.env.PRIVATEKEY, "hex")
const rinkeby = 'https://speedy-nodes-nyc.moralis.io/fd97c6c92c746b0ddfc495d4/eth/rinkeby';

//const common = new Common({ chain: Chain.Rinkeby })//used after installing and import of @ethereumjs/common


//INSTANTIATE a rinkeby web3 connection using the node
const web3 = new Web3(rinkeby);

const account1= "0xa9662631501c0c04D57de3a0d5e553280bD4C8D6";
const account2 = "0xb463e4b6afa774298471aB6134bc03445AF16297";

web3.eth.getTransactionCount(account1, (err, txCount) => {
    //building the txn
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       account2,
      value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    //const common = new Common({ chain: Chain.Rinkeby })
    //const tx =  new Tx.fromTxData(txObject, {common});
    const tx =  new Tx (txObject);
    tx.sign(privatekey);
    
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });
  
});


  