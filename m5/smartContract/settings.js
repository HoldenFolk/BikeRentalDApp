require("dotenv").config();

const settings = {
    API_KEY: process.env.API_URL || "",
    PRIVATE_WALLET_KEY: process.env.PRIVATE_WALLET_KEY || "",
};

module.exports = settings;