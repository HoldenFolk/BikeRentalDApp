# Smart Contract Project
This is the root directory fo the smart contract project. To find the frontend project for the smart contract see the frontend folder nested within this project.

Here you will find the solidity code for creatign the smart contract and the scripts for deploying it.


## Set Up

1. If it's not already the case, download node on your machine. Click on this link and follow the steps:
   https://nodejs.org/en/download

2. Run ```npm install``` to install the required dependencies for the project

3. in the **settings.js** file, you will need to add your private wallet key and provider url for deploying the contract. 

## Deploy Contract

1. run ```npx hardhat run scripts/deploy.js``` to deploy the contract to the blockchain. This will automatically add the required json files to run the frontend project locally.  

## Test

1. run "npx hardhat test"
