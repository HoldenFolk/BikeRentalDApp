/** @type import('hardhat/config').HardhatUserConfig */

import "@nomiclabs/hardhat-ethers";
import settings from './settings.js'

const {API_KEY, PRIVATE_WALLET_KEY} = settings; 

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_KEY,
      accounts: [`0x${PRIVATE_WALLET_KEY}`]
    }
  }
};
