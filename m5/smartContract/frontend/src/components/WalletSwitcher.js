import React from 'react';
import { useWallet } from '../context/WalletContext';
import settings from '../settings';
import { ethers } from 'ethers';


const WalletSwitcher = () => {
    const {wallet, isUserWalletConnected, walletAddress, connectWallet, useDefaultWallet } = useWallet();
    const provider = isUserWalletConnected ? new ethers.providers.Web3Provider(window.ethereum) : new ethers.providers.JsonRpcProvider(settings.API_KEY);
    
    return (
        <div>
            {isUserWalletConnected ? (
                <button className='button-50' onClick={useDefaultWallet}>Switch to Default Wallet</button>
            ) : (
                <button className='button-50' onClick={connectWallet}>Connect Your Wallet</button>
            )}
            <div className='text-field' style={{fontSize:'10px', width:'250px'}}>{walletAddress && `Current Connected Address: ${walletAddress}`}</div>
        </div>
        
    );
};

export default WalletSwitcher;