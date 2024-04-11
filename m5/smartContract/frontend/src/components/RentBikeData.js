import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';
import { useWallet } from '../context/WalletContext';
import settings from '../settings';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;


function RentBikeData() {
  const [bikeId, setBikeId] = useState('');
  const [name, setName] = useState('');
  //TODO: Make bike deposit a constant value
  const [loading, setLoading] = useState(false);
  const { wallet } = useWallet();
  const deposit = 10000000000000000;

  async function handleRentBike(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const signer = wallet

      const bikeRentalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const personalData = ethers.utils.formatBytes32String(`(encrypted) ${name}`);

      // Ensure deposit is sent as a transaction value (in wei)
      const tx = await bikeRentalContract.rentBike(bikeId, personalData, {
        value: ethers.utils.parseUnits(deposit.toString(), 'wei')
      });
      await tx.wait();
      alert("Bike rented successfully!");

      // Reset fields
      setBikeId('');
      setName('');
    } catch (error) {
      console.error("Failed to rent bike:", error);
      alert("Failed to rent bike. See console for more details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Revocable Option</h2>
      <form onSubmit={handleRentBike}>
        <div>
          <label htmlFor="bikeId" className='label'>Bike ID:</label>
          <input
            id="bikeId"
            type="number"
            className='text-field'
            value={bikeId}
            onChange={e => setBikeId(Math.max(0, e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="name" className='label'>Name:</label>
          <input
            id="name"
            type="text"
            className='text-field'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
        <div className='text-field' style={{fontSize:'15px', width:'250px'}}>{deposit && `Deposit Cost is: 0.001 Ethereum`}</div>
        </div>
        <button className='button-38' type="submit" disabled={loading}>
          {loading ? 'Renting...' : 'Rent Bike'}
        </button>
      </form>
    </div>
    
  );
}

export default RentBikeData;
