import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function ReturnBike() {
  const [bikeId, setBikeId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleReturnBike(event) {
    event.preventDefault();

    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
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