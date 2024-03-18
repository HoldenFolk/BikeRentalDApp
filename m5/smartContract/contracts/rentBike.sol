// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BikeRental {
    struct Bike {
        bool isAvailable;
        uint256 pricePerHour; // Price per hour in wei
        address currentRenter;
        uint256 rentalStartTime;
        uint256 depositAmount;
    }

    address payable owner;
    mapping(uint256 => Bike) public bikes;
    uint256 public totalBikes;

    event BikeRented(uint256 bikeId, address renter, uint256 startTime);
    event BikeReturned(uint256 bikeId, address renter, uint256 amountRefunded);

    constructor() {
        owner = payable(msg.sender);
    }

    function registerBike(uint256 pricePerHour) external {
        require(msg.sender == owner, "Only the owner can register a bike.");
        uint256 bikeId = totalBikes++;
        bikes[bikeId] = Bike(true, pricePerHour, address(0), 0, 0);
    }

    function rentBike(uint256 bikeId) external payable {
        Bike storage bike = bikes[bikeId];
        require(bike.isAvailable, "Bike is currently rented.");
        require(msg.value >= bike.pricePerHour, "Deposit must cover at least one hour.");

        bike.isAvailable = false;
        bike.currentRenter = msg.sender;
        bike.rentalStartTime = block.timestamp;
        bike.depositAmount = msg.value;

        emit BikeRented(bikeId, msg.sender, bike.rentalStartTime);
    }

    function returnBike(uint256 bikeId) external {
        Bike storage bike = bikes[bikeId];
        require(!bike.isAvailable, "Bike is not rented.");
        require(bike.currentRenter == msg.sender, "Caller is not the current renter.");

        uint256 rentalDuration = block.timestamp - bike.rentalStartTime;
        uint256 rentalHours = rentalDuration / 3600;
        if (rentalDuration % 3600 > 0) {
            rentalHours += 1; // Round up to the next hour
        }
        uint256 rentalCost = rentalHours * bike.pricePerHour;
        require(bike.depositAmount >= rentalCost, "Rental cost exceeds deposit.");

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

        emit BikeReturned(bikeId, msg.sender, refundAmount);
    }

    // Additional functions such as extending rental, handling disputes, etc., can be added as needed
}
