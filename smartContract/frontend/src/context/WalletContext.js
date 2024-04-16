import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import settings from '../settings';

const WalletContext = createContext();

const defaultProvider = new ethers.providers.JsonRpcProvider(settings.API_KEY);
const defaultWallet = new ethers.Wallet(settings.PRIVATE_WALLET_KEY, defaultProvider);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(defaultWallet);
  const [isUserWalletConnected, setIsUserWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(defaultWallet.address)

  async function connectWallet() {
   
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        //Set context variables for the wallet
        setWallet(signer);
        setIsUserWalletConnected(true);
        setWalletAddress(address);

        console.log("Wallet connected: ", address);
        console.log(isUserWalletConnected);
      } catch (error) {
        console.error("Could not connect to wallet", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  const useDefaultWallet = () => {
    setWallet(defaultWallet);
    setIsUserWalletConnected(false);
    setWalletAddress(defaultWallet.address);
  };

  return (
    <WalletContext.Provider value={{ wallet, isUserWalletConnected, walletAddress, connectWallet, useDefaultWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
