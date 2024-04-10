import React from 'react';
import { useWallet } from '../context/WalletContext';


const WalletSwitcher = () => {
    const {wallet, isUserWalletConnected, connectWallet, useDefaultWallet } = useWallet();
    const walletAddress = wallet.address;
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