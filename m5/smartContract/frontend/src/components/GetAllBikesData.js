import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';
import ReactModal from 'react-modal';
import settings from '../settings';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function GetAllBikesData() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchAllBikesData = async () => {
  
      setLoading(true);
      const provider = new ethers.providers.JsonRpcProvider(settings.API_KEY);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      try {
        const totalBikes = await contract.totalBikes(); 
        const bikeDataPromises = [];
        
        for (let i = 0; i < totalBikes.toNumber(); i++) {
          bikeDataPromises.push(contract.getBikeData(i));
        }
  
        const bikesData = await Promise.all(bikeDataPromises);
        const formattedBikesData = bikesData.map((bike, index) => ({
          id: index,
          isAvailable: bike.isAvailable,
          pricePerHour: ethers.utils.formatUnits(bike.pricePerHour, 'wei'),
          currentRenter: bike.currentRenter,
          rentalStartTime: new Date(bike.rentalStartTime.toNumber() * 1000).toLocaleString(),
          depositAmount: ethers.utils.formatUnits(bike.depositAmount, 'wei'),
          personalData: ethers.utils.parseBytes32String(bike.personalData)
        }));
  
        setBikes(formattedBikesData);
      } catch (error) {
        console.error("Failed to fetch bikes data:", error);
        alert("Failed to fetch bikes data. See console for more details.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAllBikesData();
    }, []);
  
    return (
      <div>
      <button onClick={() => {
        fetchAllBikesData();
        setIsOpen(true);
      }} disabled={loading} className='button-50'>
        {loading ? 'Refreshing...' : 'See Bikes Data'}
      </button>
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
          <p>Is Available: {bike.isAvailable ? 'Yes' : 'No'}</p>
          <p>Price Per Hour: {bike.pricePerHour} wei</p>
          <p>Current Renter: {bike.currentRenter === ethers.constants.AddressZero ? 'None' : bike.currentRenter}</p>
          <p>Rental Start Time: {bike.rentalStartTime}</p>
          <p>Deposit Amount: {bike.depositAmount} wei</p>
          <p>Personal Data: {bike.personalData === 0 ? 'None' : bike.personalData}</p>
          <hr />
        </div>
        ))
      )}
      </ReactModal>
      </div>
    );
  }
  
  export default GetAllBikesData;