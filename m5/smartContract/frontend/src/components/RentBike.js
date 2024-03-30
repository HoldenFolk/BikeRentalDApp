import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function RentBike() {
    const [bikeId, setBikeId] = useState('');
    const [deposit, setDeposit] = useState('');
    const [loading, setLoading] = useState(false);
  
    async function handleRentBike(event) {
      event.preventDefault();
  
      if (!window.ethereum) {
        alert("Please install MetaMask to interact with this feature.");
        return;
      }
  
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
  
        const bikeRentalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        // Ensure deposit is sent as a transaction value (in wei)
        const tx = await bikeRentalContract.rentBike(bikeId, {
          value: ethers.utils.parseUnits(deposit, 'wei')
        });
        await tx.wait();
        alert("Bike rented successfully!");
  
        // Reset fields
        setBikeId('');
        setDeposit('');
      } catch (error) {
        console.error("Failed to rent bike:", error);
        alert("Failed to rent bike. See console for more details.");
      } finally {
        setLoading(false);
      }
    }
  
    return (
    
      <div>  
        <h2>Rent Bike</h2>
        <form onSubmit={handleRentBike}>
            <div>
            <label htmlFor="bikeId">Bike ID:</label>
            <input
                id="bikeId"
                type="number"
                value={bikeId}
                onChange={e => setBikeId(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="deposit">Deposit (in wei):</label>
            <input
                id="deposit"
                type="text"
                value={deposit}
                onChange={e => setDeposit(e.target.value)}
                required
            />
            </div>
            <button type="submit" disabled={loading}>
            {loading ? 'Renting...' : 'Rent Bike'}
            </button>
        </form>
      </div>
    );
  }
  
  export default RentBike;