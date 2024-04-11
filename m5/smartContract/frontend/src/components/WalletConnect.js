import React, { useState } from 'react';
import { ethers } from 'ethers';

function WalletConnect() {
  const [userAddress, setUserAddress] = useState('');

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        console.log("Wallet connected: ", address);
      } catch (error) {
        console.error("Could not connect to wallet", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  return (
    <div>
      <button className='button-50' onClick={connectWallet}>Connect Wallet</button>
      <div className='text-field' style={{fontSize:'10px', width:'250px'}}>{userAddress && `Connected Address: ${userAddress}`}</div>
    </div>
  );
}

export default WalletConnect;
