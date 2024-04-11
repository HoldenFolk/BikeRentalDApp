import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';
import settings from '../settings';
import { useWallet } from '../context/WalletContext';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function ReturnBike() {
  const [bikeId, setBikeId] = useState('');
  const [loading, setLoading] = useState(false);
  const { wallet } = useWallet();

  async function handleReturnBike(event) {
    event.preventDefault();

    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(settings.API_KEY);
      const signer = wallet
      const bikeRentalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await bikeRentalContract.returnBike(bikeId);
      await tx.wait();

      alert("Bike returned successfully!");
    } catch (error) {
      console.error("Failed to return bike:", error);
      alert("Failed to return bike. See console for more details.");
    } finally {
      setLoading(false);
    }

    setBikeId(''); // Reset bike ID input after attempting to return a bike
  }

  function handleBikeIdChange(e) {
    const value = e.target.value;
    if (value >= 0) {
      setBikeId(value);
    }
  }

  return (
    <div>
      <h2>Return Bike</h2>
      <form onSubmit={handleReturnBike}>
        <div>
        <label htmlFor="bikeId" className='label'>Bike ID:</label>
        <input
          id="bikeId"
          type="number"
          className='text-field'
          value={bikeId}
          onChange={handleBikeIdChange}
          required
        />
        </div>
        <div>
        <button type="submit" disabled={loading} className='button-38'>
          {loading ? 'Processing...' : 'Return Bike'}
        </button>
        </div>
      </form>
    </div>
  );
}

export default ReturnBike;