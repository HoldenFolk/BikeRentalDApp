## decryptor

- this is what the third-party decryptor server should look like
- it stores its private key in the TEE (we dont have the hardware for that)
- the code ran in the TEE and by the server is separeted

- it has two functions :
- return the public key
- decrypt the data
