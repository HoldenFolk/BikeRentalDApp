import { ethers } from "ethers";
require('dotenv').config();
const contractABI = require("../contract-abi.json");
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;


let helloWorldContract;

export const getHelloWorldContract = async () => {
    const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_SEPHOLIA_ENDPOINT);

    console.log("Deploying contract to ", provider);

    const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_WALLET_KEY, provider);

    console.log("Deploying contract with the account: ", signer);

    // replace with your contract's address and abi
    helloWorldContract = new ethers.Contract(contractAddress, contractABI, signer);
    // const connection = contract.connect(signer);
    // console.log("Contract connected: ", connection);
    console.log("Deploying contract...", helloWorldContract);
    //return contract;
};

// note to make it work -> have money in your wallet
export const deployHelloWorldContract = async () => {

    // Create an ethers provider
    const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_SEPHOLIA_ENDPOINT);

    // Create a wallet with the private key
    const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_WALLET_KEY, provider);

    const balance = await provider.getBalance(signer.address);
    console.log("Balance: ", ethers.formatEther(balance), "ETH");

    // Get the contract factory
    helloWorldContract = new ethers.ContractFactory(contractABI, process.env.REACT_APP_BYTE_CODE, signer);

    console.log("Deploying contract: ", helloWorldContract);
    const contract = await helloWorldContract.deploy("Hello World");
    await contract.deployed();

    console.log("message: ", contract.message());

    // // Deploy the contract
    // const transaction = await HelloWorldFactory.getDeployTransaction("test message", {
    //     value: 0,
    //     gasLimit: 3000000,
    //     gasPrice: ethers.parseEther("0.1"),
    // });


    // console.log("Deploy transaction: ", transaction);

    // const gasEstimate = await signer.estimateGas(transaction);

    // console.log("Gas estimate: ", gasEstimate);

    // // Wait for the transaction to be mined
    // const txReceipt = await signer.sendTransaction(transaction);
    // console.log("Transaction receipt: ", txReceipt);

    // console.log("Contract deployed instance", HelloWorldFactory);

    return;
}

// export const helloWorldContract = new web3.eth.Contract(
//     contractABI,
//     contractAddress
// );

export const loadCurrentMessage = async () => {
    if (!helloWorldContract) {
        await deployHelloWorldContract();
    }
    // log current contrract address
    // console.log("Contract Address: ", helloWorldContract);
    // const message = await helloWorldContract.message();
    return "message";
};


export const connectWallet = async () => {
  
};

export const getCurrentWalletConnected = async () => {
  
};

export const updateMessage = async (address, message) => {
  
};