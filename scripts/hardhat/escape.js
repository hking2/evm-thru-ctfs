const { ethers } = require('ethers');
require('dotenv').config();

const CONTRACT_ADDRESS = "0x36ce5aa25b99cf6eb019aafd149b97b32cdd4a5b";

const provider = ethers.getDefaultProvider("mainnet", {
  alchemy: "(OPTIONAL) alchemy api key",
  etherscan: "(OPTIONAL) etherscan api key"
})

const tx = {
  to: CONTRACT_ADDRESS,
  data: "TODO" // transaction data, aka calldata
};


(async () => {
  if (tx.data === "TODO") {
    console.log("Fill in the TODO")
  } else {
    const returnVal = await provider.call(tx);
    const formatted = BigInt(returnVal).toString();
    console.log("returnVal: ", formatted);
  }
})()