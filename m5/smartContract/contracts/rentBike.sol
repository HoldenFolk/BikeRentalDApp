// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract BikeRental {
    struct Bike {
        bool isAvailable;
        uint256 pricePerHour; // Price per hour in wei
        address currentRenter;
        uint256 rentalStartTime;
        uint256 depositAmount;
    }

    mapping(uint256 => bytes32) private data;

    address payable owner;
    address contractAddress;
    mapping(uint256 => Bike) public bikes;
    uint256 public totalBikes;
    uint256 public depositCost;

    event BikeRented(uint256 bikeId, address renter, uint256 startTime);
    event BikeReturned(uint256 bikeId, address renter, uint256 amountRefunded);
    event OverdueBikes(bytes32[] overdueBikes);

    constructor() {
        //Initalize important attributes of the contract. Will only happen once one the contract is deployed.
        owner = payable(msg.sender);
        depositCost = 1000000;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the owner can access this function."
        );
        _;
    }

    function getOwner() external view returns (address) {
        require(msg.sender == owner, "Only the owner can see their address.");
        return owner;
    }

    function getBikeData(
        uint256 bikeId
    )
        public
        view
        returns (
            bool isAvailable,
            uint256 pricePerHour,
            address currentRenter,
            uint256 rentalStartTime,
            uint256 depositAmount
        )
    {
        Bike storage bike = bikes[bikeId];
        return (
            bike.isAvailable,
            bike.pricePerHour,
            bike.currentRenter,
            bike.rentalStartTime,
            bike.depositAmount
        );
    }

    function registerBike(uint256 pricePerHour) public {
        require(msg.sender == owner, "Only the owner can register a bike.");
        uint256 bikeId = totalBikes++;
        bikes[bikeId] = Bike(true, pricePerHour, address(0), 0, 0);
    }

    function rentBike(uint256 bikeId) external payable {
        Bike storage bike = bikes[bikeId];
        // verify personalData
        data[bikeId] = personalData; // this line is vulnerable to reentrancy attack

        require(bike.isAvailable, "Bike is currently rented.");
        require(
            msg.value >= depositCost,
            "Deposit must be greater than or equal to the deposit cost."
        );

        bike.isAvailable = false;
        bike.currentRenter = msg.sender;
        bike.rentalStartTime = block.timestamp;
        bike.depositAmount = msg.value;

        emit BikeRented(bikeId, msg.sender, bike.rentalStartTime);
    }

    function returnBike(uint256 bikeId) external payable {
        Bike storage bike = bikes[bikeId];
        require(!bike.isAvailable, "Bike is not rented.");
        require(
            bike.currentRenter == msg.sender,
            "Caller is not the current renter."
        );

        uint256 rentalDuration = block.timestamp - bike.rentalStartTime;
        uint256 rentalHours = rentalDuration / 3600;
        if (rentalDuration % 3600 > 0) {
            rentalHours += 1; // Round up to the next hour
        }
        uint256 rentalCost = rentalHours * bike.pricePerHour;
        require(
            bike.depositAmount >= rentalCost,
            "Rental cost exceeds deposit."
        );

        uint256 refundAmount = bike.depositAmount - rentalCost;

        // Reset bike rental information
        bike.isAvailable = true;
        bike.currentRenter = address(0);
        bike.rentalStartTime = 0;
        bike.depositAmount = 0;

        // Refund the remaining deposit to the renter
        payable(msg.sender).transfer(refundAmount);

        // Transfer the rental cost to the owner
        owner.transfer(rentalCost);

        data[bikeId] = 0; // clear personal data

        emit BikeReturned(bikeId, msg.sender, refundAmount);
    }

    function getOverdueBikes() public onlyOwner {
        uint256 currentTime = block.timestamp;
        bytes32[] memory overdueBikes = new bytes32[](10); // Initialize array with appropriate length
        uint256 index = 0;

        for (uint256 bikeId = 0; bikeId < 10; bikeId++) {
            Bike storage bike = bikes[bikeId];
            if (
                !bike.isAvailable && currentTime - bike.rentalStartTime < 1 days
            ) {
                // Add the bikeId to the overdueBikes list
                overdueBikes[index] = data[bikeId];
                index++;
            }
        }

        // Resize the array to remove any unused elements
        bytes32[] memory resizedOverdueBikes = new bytes32[](index);
        for (uint256 i = 0; i < index; i++) {
            resizedOverdueBikes[i] = overdueBikes[i];
        }

        emit OverdueBikes(resizedOverdueBikes);
    }
}
