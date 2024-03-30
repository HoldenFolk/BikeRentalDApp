import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function RegisterBike() {
  const [pricePerHour, setPricePerHour] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegisterBike(event) {
    event.preventDefault();

    if (!window.ethereum) {
      alert("Please install MetaMask to interact with this feature.");
      return;
    }

    try {
      setLoading(true);

      // Access web provider and get signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Get contract object from Web3 provider
      const bikeRentalContract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call register bike function and wait for it to complete on the blockchain
      const tx = await bikeRentalContract.registerBike(ethers.utils.parseUnits(pricePerHour, 'wei'));
      await tx.wait();
      alert("Bike registered successfully!");

      setPricePerHour(''); // Reset input field after successful registration
    } catch (error) {
      console.error("Failed to register bike:", error);
      alert("Failed to register bike. See console for more details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>  
      <h2>Register New Bike</h2>
        <form onSubmit={handleRegisterBike}>
          <div>
            <label htmlFor="pricePerHour">Price Per Hour (in wei):</label>
            <input
              id="pricePerHour"
              type="number"
              value={pricePerHour}
              onChange={e => setPricePerHour(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register Bike'}
          </button>
        </form>
    </div>
  );
}

export default RegisterBike;
