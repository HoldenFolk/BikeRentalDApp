import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbiImport from '../contracts/BikeRental.json';
import contractAdressImport from '../contracts/contract-address.json';

const contractABI = contractAbiImport.abi;
const contractAddress = contractAdressImport.ContractAddress;

function GetAllBikesData() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchAllBikesData() {
        if (!window.ethereum) {
          alert("Please install MetaMask to use this feature.");
          return;
        }
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        try {
          const totalBikes = await contract.totalBikes(); // Assume this is a public variable or has a getter
          const bikeDataPromises = [];
          
          for (let i = 0; i < totalBikes.toNumber(); i++) {
            bikeDataPromises.push(contract.getBikeData(i));
          }
  
          const bikesData = await Promise.all(bikeDataPromises);
          const formattedBikesData = bikesData.map((bike, index) => ({
            id: index,
            isAvailable: bike[0],
            pricePerHour: ethers.utils.formatUnits(bike[1], 'wei'),
            currentRenter: bike[2],
            rentalStartTime: new Date(bike[3].toNumber() * 1000).toLocaleString(),
            depositAmount: ethers.utils.formatUnits(bike[4], 'wei'),
          }));
  
          setBikes(formattedBikesData);
        } catch (error) {
          console.error("Failed to fetch bikes data:", error);
          alert("Failed to fetch bikes data. See console for more details.");
        } finally {
          setLoading(false);
        }
      }
  
      fetchAllBikesData();
    }, []);
  
    if (loading) return <p>Loading bikes...</p>;
  
    return (
      <div>
        <h2>All Bikes Data</h2>
        {bikes.map((bike) => (
          <div key={bike.id}>
            <p>Bike ID: {bike.id}</p>
            <p>Is Available: {bike.isAvailable ? 'Yes' : 'No'}</p>
            <p>Price Per Hour: {bike.pricePerHour} wei</p>
            <p>Current Renter: {bike.currentRenter === ethers.constants.AddressZero ? 'None' : bike.currentRenter}</p>
            <p>Rental Start Time: {bike.rentalStartTime}</p>
            <p>Deposit Amount: {bike.depositAmount} wei</p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
  
  export default GetAllBikesData;