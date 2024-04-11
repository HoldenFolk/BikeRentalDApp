// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract BikeRental {
    struct Bike {
        bool isAvailable;
        uint256 pricePerHour; // Price per hour in wei
        address currentRenter;
        uint256 rentalStartTime;
        uint256 depositAmount;
        bool claimed;
        bytes32 personalData;
    }

    address payable owner;
    address contractAddress;
    mapping(uint256 => Bike) public bikes;
    uint256 public totalBikes;
    uint256 public depositCost;
    uint256 public numberOfBikes;

    event BikeRented(uint256 bikeId, address renter, uint256 startTime);
    event BikeReturned(uint256 bikeId, address renter, uint256 amountRefunded);
    event OverdueBikes(uint256[] overdueBikes);

    //Nothing
    constructor() {
        //Initalize important attributes of the contract. Will only happen once one the contract is deployed.
        owner = payable(msg.sender);
        depositCost = 10000000000000000;
        numberOfBikes = 0;
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
            uint256 depositAmount,
            bool claimed, // for bike to get claimed only once
            bytes32 personalData
        )
    {
        Bike storage bike = bikes[bikeId];
        return (
            bike.isAvailable,
            bike.pricePerHour,
            bike.currentRenter,
            bike.rentalStartTime,
            bike.depositAmount,
            bike.claimed,
            bike.personalData
        );
    }

    function registerBike(uint256 pricePerHour) public {
        require(msg.sender == owner, "Only the owner can register a bike.");
        uint256 bikeId = totalBikes++;
        bikes[bikeId] = Bike(true, pricePerHour, address(0), 0, 0, true, 0);
        numberOfBikes++;
    }

    function rentBike(uint256 bikeId, bytes32 personalData) external payable {
        Bike storage bike = bikes[bikeId];

        require(bike.isAvailable, "Bike is currently rented.");
        require(
            msg.value >= depositCost,
            "Deposit must be greater than or equal to the deposit cost."
        );

        bike.isAvailable = false;
        bike.claimed = false;
        bike.currentRenter = msg.sender;
        bike.rentalStartTime = block.timestamp;
        bike.depositAmount = msg.value;
        bike.personalData = personalData;

        emit BikeRented(bikeId, msg.sender, bike.rentalStartTime);
    }

    // fucntion to test the revocable privacy option
    function rentBikePast(
        uint256 bikeId,
        bytes32 personalData
    ) external payable {
        Bike storage bike = bikes[bikeId];

        require(bike.isAvailable, "Bike is currently rented.");
        require(
            msg.value >= depositCost,
            "Deposit must be greater than or equal to the deposit cost."
        );

        bike.isAvailable = false;
        bike.claimed = false;
        bike.currentRenter = msg.sender;
        bike.rentalStartTime = block.timestamp - 1 days;
        bike.depositAmount = msg.value;
        bike.personalData = personalData;

        emit BikeRented(bikeId, msg.sender, bike.rentalStartTime);
    }

    function rentBikeDeposit(uint256 bikeId) external payable {
        Bike storage bike = bikes[bikeId];
        require(bike.isAvailable, "Bike is currently rented.");
        require(
            msg.value == depositCost,
            "Deposit must equal to the deposit cost."
        );

        bike.isAvailable = false;
        bike.claimed = false;
        bike.currentRenter = msg.sender;
        bike.rentalStartTime = block.timestamp;
        bike.depositAmount = msg.value;
        bike.personalData = 0;

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
        bike.claimed = true;
        bike.currentRenter = address(0);
        bike.rentalStartTime = 0;
        bike.depositAmount = 0;
        bike.personalData = 0;

        // Refund the remaining deposit to the renter
        payable(msg.sender).transfer(refundAmount);

        // Transfer the rental cost to the owner
        owner.transfer(rentalCost);

        emit BikeReturned(bikeId, msg.sender, refundAmount);
    }

    function getOverdueBikes() public onlyOwner {
        uint256 currentTime = block.timestamp;
        uint256[] memory overdueBikes = new uint256[](numberOfBikes);
        uint256 index = 0;

        for (uint256 bikeId = 0; bikeId < numberOfBikes; bikeId++) {
            Bike storage bike = bikes[bikeId];
            if (
                !bike.isAvailable &&
                currentTime - bike.rentalStartTime > 1 days &&
                !bike.claimed
            ) {
                // deposit option
                if (bike.personalData == 0) {
                    owner.transfer(bike.depositAmount); // Transfer the deposit to the owner
                    bike.depositAmount = 0; // Reset the deposit amount
                    bike.claimed = true; // Mark the bike as claimed
                    overdueBikes[index] = bikeId;
                }
                // privacy unless option
                else {
                    // call to decrypt personal data !!
                    bike.personalData = removeLast12(bike.personalData);
                    //
                    overdueBikes[index] = bikeId;
                    bike.claimed = true; // Mark the bike as claimed
                }
                index++;
            }
        }

        // Resize the array to remove any unused elements
        uint256[] memory resizedOverdueBikes = new uint256[](index);
        for (uint256 i = 0; i < index; i++) {
            resizedOverdueBikes[i] = i;
        }

        emit OverdueBikes(resizedOverdueBikes);
    }

    function resetBike(uint256 bikeId) public onlyOwner {
        Bike storage bike = bikes[bikeId];
        bike.isAvailable = true;
        bike.claimed = true;
        bike.currentRenter = address(0);
        bike.rentalStartTime = 0;
        bike.depositAmount = 0;
        bike.personalData = 0;
    }

    function removeLast12(bytes32 input) public pure returns (bytes32) {
        bytes32 result;
        assembly {
            // Set the result to the input shifted right by 96 bits (12 bytes)
            result := shl(96, input)
        }
        return result;
    }
}
