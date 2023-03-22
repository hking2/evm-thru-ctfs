const { ethers } = require('ethers');
require("dotenv").config();

const ut = ethers.utils;
const bn = ethers.BigNumber;

// npx hardhat run scripts/hardhat/escape/static.js

const CONTRACT_ADDRESS = "0x36ce5aa25b99cf6eb019aafd149b97b32cdd4a5b";

const provider = ethers.getDefaultProvider("mainnet", {
  alchemy: process.env.RPC_MAINNET,
  etherscan: process.env.ETHERSCAN_KEY
})

// take first 4 bytes (8 digits after 0x) of keccak hash of function w/ params to get function selector
const selectorHash = ut.keccak256(ut.toUtf8Bytes("mysteryFunc(uint256,uint256)"));
const selector = selectorHash.slice(2,10);
console.log(`selector: ${selector}`); // b40d7b75

// build args by padding values with 32 bytes (uint256)
const arg1 = ut.hexValue(3);
const arg2 = ut.hexValue(4);

const paddedArg1 = ut.hexZeroPad(arg1, 32);
const paddedArg2 = ut.hexZeroPad(arg2, 32);

// concat padded args
const args = paddedArg1.slice(2) + paddedArg2.slice(2);
// console.log(args);

// concat selector and args
const calldata = "0x" + selector + args;
console.log(calldata);

const tx = {
  to: CONTRACT_ADDRESS,
  data: calldata
};


(async () => {
  if (tx.data === "TODO") {
    console.log("Fill in the TODO")
  } else {
		console.log("Simulation complete")
    const returnVal = await provider.call(tx);
    const formatted = BigInt(returnVal).toString();
    console.log("returnVal: ", formatted);
  }
})()
