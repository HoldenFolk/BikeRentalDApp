const express = require('express');
const { EnclaveFactory } = require('sgx-ias-js');
const NodeRSA = require('node-rsa');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Connect to a local Ethereum node

const contractABI = []; // Specify the ABI of the contract
const contractAddress = '0x123...'; // Specify the address of the deployed contract

const contract = new web3.eth.Contract(contractABI, contractAddress);

const app = express();
const port = 3000;

// Initialize enclave
// real command => const enclave = EnclaveFactory.getDefaultEnclave();

// Route to decrypt data
app.get('/decrypt/:encryptedData', async (req, res) => {
    try {
        const encryptedData = req.params.encryptedData;

        const decryptedData = await decryptData(encryptedData);

        res.send(decryptedData);

    } catch (error) {
        console.error('Error decrypting data:', error);
        res.status(500).send('Error decrypting data');
    }
});

// happens inside the TEE
decryptData = async (encryptedData) => {
    // Sample RSA private key stored in the enclave (replace with actual key)
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    MIIEpQIBAAKCAQEA7z4DgE4zydykQm2sz6r/23yJUaYYnpzAV9t9r9B9xltbFklg
    tMnz4O6G9wq3KQVVqeejW9kC5oUwqj2Z5ge8bZwO55Tt5Ezuu3RMie+MkO/5GwL
    ... (private key content)
    -----END RSA PRIVATE KEY-----`;

    // Initialize RSA instance with the decrypted private key
    const key = new NodeRSA(privateKey);

    // Decrypt data using the private key
    const decryptedData = key.decrypt(encryptedData, 'utf8');

    return decryptedData;
};

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
