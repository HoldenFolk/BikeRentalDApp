require('dotenv').config();
const contractABI = require("../contract-abi.json");
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

console.log(contractAddress);

export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

console.log(helloWorldContract);

export const loadCurrentMessage = async () => { 
    const message = await helloWorldContract.methods.message().call(); 
    return message;
};

export const connectWallet = async () => {
  
};

export const getCurrentWalletConnected = async () => {
  
};

export const updateMessage = async (address, message) => {
  
};