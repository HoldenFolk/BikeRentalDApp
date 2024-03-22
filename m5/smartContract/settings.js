require("dotenv").config();

const settings = {
    API_KEY: process.env.API_URL || "https://eth-sepolia.g.alchemy.com/v2/HXjjusRFIBAON5F6zYB6Rx2wadciuy02",
    PRIVATE_WALLET_KEY: process.env.PRIVATE_WALLET_KEY || "1a65cab7526a80105a3b1c94f834a21f8b9ecb34554572809f1c1b39ce3b582f",
};

module.exports = settings;