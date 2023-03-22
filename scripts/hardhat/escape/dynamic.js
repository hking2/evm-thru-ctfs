const { ethers } = require('ethers');
require("dotenv").config();

const ut = ethers.utils;
const bn = ethers.BigNumber;

// npx hardhat run scripts/hardhat/escape/dynamic.js

const CONTRACT_ADDRESS = "0x47D2A4c4e3b3cd645484a3AE217cC8c7EAbE60Ae";

const provider = ethers.getDefaultProvider("mainnet", {
  alchemy: process.env.RPC_MAINNET,
  etherscan: process.env.ETHERSCAN_KEY
})

// *20 hex padded = 32 bytes
// *static vars are coded directly, dynamics need location reffed

// take first 4 bytes (8 digits after 0x) of keccak hash of function w/ params to get function selector
const selectorHash = ut.keccak256(ut.toUtf8Bytes("mysteryFunc(uint256[],uint256[])"));
const selector = selectorHash.slice(2,10);
console.log(`selector: ${selector}`); // ab33b5ce

// locations of args
const locationArg1 = ut.hexZeroPad(0x40, 32);
const locationArg2 = ut.hexZeroPad(0xA0, 32); // actual location is 0xC0, but offset by locationArg1, so 0xA0 is accurate

// concat padded locations
const locations = locationArg1.slice(2) + locationArg2.slice(2);

// build args by padding values with 32 bytes (uint256)
const numofArgs1 = ut.hexZeroPad(ut.hexValue(2), 32);

const arg1of1 = ut.hexZeroPad(ut.hexValue(1), 32);
const arg2of1 = ut.hexZeroPad(ut.hexValue(2), 32);

const args1 = numofArgs1.slice(2) + arg1of1.slice(2) + arg2of1.slice(2);

const numofArgs2 = ut.hexZeroPad(ut.hexValue(2), 32);

const arg1of2 = ut.hexZeroPad(ut.hexValue(3), 32);
const arg2of2 = ut.hexZeroPad(ut.hexValue(4), 32);

const args2 = numofArgs2.slice(2) + arg1of2.slice(2) + arg2of2.slice(2);


// concat selector and args
const calldata = "0x" + selector + locations + args1 + args2;
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



0xab33b5ce

0x0000000000000000000000000000000000000000000000000000000000000040
0x00000000000000000000000000000000000000000000000000000000000000c0

0x0000000000000000000000000000000000000000000000000000000000000002

0x0000000000000000000000000000000000000000000000000000000000000001
0x0000000000000000000000000000000000000000000000000000000000000002

0x0000000000000000000000000000000000000000000000000000000000000002

0x0000000000000000000000000000000000000000000000000000000000000003
0x0000000000000000000000000000000000000000000000000000000000000004