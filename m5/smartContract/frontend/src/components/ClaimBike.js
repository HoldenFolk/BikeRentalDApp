import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';
import settings from '../settings';
import { useWallet } from '../context/WalletContext';
import ReactModal from 'react-modal';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function ClaimBike() {
  const [loading, setLoading] = useState(false);
  const { wallet } = useWallet();
  const [bikes, setBikes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function handleReturnBike(event) {
    event.preventDefault();

    setIsOpen(true);

    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(settings.API_KEY);
      const signer = wallet
      const bikeRentalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await bikeRentalContract.getOverdueBikes();

      // Wait for the transaction to be mined and get the receipt
      const receipt = await tx.wait();

      console.log(receipt);

      // Access the overdueBikes array from the transaction receipt
      const overdueBikes = receipt.events[0].args.overdueBikes.map(
        c => c.toNumber()
      );

      const bikeDataPromises = [];
        
        for (let i = 0; i < overdueBikes.length; i++) {
            const index = parseInt(overdueBikes[i]);
            bikeDataPromises.push({
                id: index,
                bike: bikeRentalContract.getBikeData(index)
            });
        }
  
        const bikesData = await Promise.all(bikeDataPromises);

        const formattedBikesData = []
        bikesData.map(c => (
            c.bike.then(b => formattedBikesData.push({ 
                id: c.id,
                currentRenter: b.currentRenter,
                rentalStartTime: new Date(b.rentalStartTime * 1000).toLocaleString(),
                personalData: ethers.utils.parseBytes32String(b.personalData),
            }))
        ));
  
        setBikes(formattedBikesData);

      alert("Bike returned successfully!");
    } catch (error) {
      console.error("Failed to return bike:", error);
      alert("Failed to return bike. See console for more details.");
    } finally {
      setLoading(false);
    } // Reset bike ID input after attempting to return a bike
  }

  return (
    <div>
      <h2>Claim Late Bikes</h2>
      <form onSubmit={handleReturnBike}>
        <button type="submit" disabled={loading} className='button-38'>
          {loading ? 'Processing...' : 'Return Bike'}
        </button>
      </form>
      <ReactModal isOpen={isOpen}
      contentLabel='Bikes Data'
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}>
      {loading ? (
        <p>Loading bikes...</p>
      ) : (
        bikes.map((bike) => (
        <div className='text-field' key={bike.id}>
          <p>Bike ID: {bike.id}</p>
          <p>Current Renter: {bike.currentRenter === ethers.constants.AddressZero ? 'None' : bike.currentRenter}</p>
          <p>Rental Start Time: {bike.rentalStartTime}</p>
          <p>Personal Data: {bike.personalData === 0 ? 'None' : bike.personalData}</p>
          <hr />
        </div>
        ))
      )}
      </ReactModal>
    </div>
  );
}

export default ClaimBike;