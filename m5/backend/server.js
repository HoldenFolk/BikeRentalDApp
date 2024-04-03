const express = require('express');
const { EnclaveFactory } = require('sgx-ias-js');
const crypto = require('crypto');
const Web3 = require('web3');
//const web3 = new Web3('http://localhost:8545'); // Connect to a local Ethereum node

const contractABI = []; // Specify the ABI of the contract
const contractAddress = '0x123...'; // Specify the address of the deployed contract

//const contract = new web3.eth.Contract(contractABI, contractAddress);

const app = express();
const port = 3000;

module.exports = app;

// Initialize enclave
// real command => const enclave = EnclaveFactory.getDefaultEnclave();

// Route to decrypt data
app.get('/decrypt/:encryptedData', async (req, res) => {
    try {
        const encryptedData = req.params.encryptedData;

        console.log('Encrypted data:', encryptedData);

        const decryptedData = await decryptData(encryptedData);

        res.send(decryptedData);

    } catch (error) {
        console.error('Error decrypting data:', error);
        res.status(500).send('Error decrypting data');
    }
});

// happens inside the TEE
decryptData = async (encryptedData) => {
    // Sample RSA private key stored in the enclave 
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    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
    -----END RSA PRIVATE KEY-----`;

    // Convert private key string to Buffer
    const privateKeyBuffer = await Buffer.from(privateKey, 'utf8');

    console.log('Decrypting data...');

    // Decrypt data using private key
    const decryptedData = await crypto.privateDecrypt(privateKeyBuffer, Buffer.from(encryptedData, 'base64'));

    // Return the decrypted data
    return decryptedData.toString('utf8');
};

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
