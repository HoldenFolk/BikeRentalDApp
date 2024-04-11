import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("BikeRental", function () {
  let bikeRental;
  let deployer, renter;

  beforeEach(async function () {
    // Deploy the contract before each test
    const BikeRental = await ethers.getContractFactory("BikeRental");
    bikeRental = await BikeRental.deploy();
    await bikeRental.deployed();
    [deployer, renter] = await ethers.getSigners();
  });

  // describe("checkDeployment", function () {
  //   it("should know the owner of the deployment", async function () {
  //     expect(await bikeRental.getOwner()).to.equal(deployer.address);
  //   });
  // });

  // describe("registerBike", function () {
  //   it("should allow the owner to register a bike", async function () {
  //     // Initial total bikes should be 0
  //     let totalBikes = await bikeRental.totalBikes();
  //     expect(totalBikes.toString()).to.equal("0");

  //     // Register a bike as the owner
  //     const pricePerHour = ethers.utils.parseEther("0.01"); // Example price
  //     const tx = await bikeRental.registerBike(pricePerHour);
  //     await tx.wait();

  //     // Check total bikes is now 1
  //     totalBikes = await bikeRental.totalBikes();
  //     expect(totalBikes.toString()).to.equal("1");

  //     // Verify bike details
  //     const bike = await bikeRental.bikes(0);
  //     expect(bike.isAvailable).to.equal(true);
  //     expect(bike.pricePerHour.toString()).to.equal(pricePerHour.toString());
  //   });

    // it("should fail if a non-owner tries to register a bike", async function () {
    //     const pricePerHour = ethers.utils.parseEther("0.01");
    //     // Attempt to register a bike as a non-owner, should be reverted
    //     await expect(bikeRental.connect(renter).registerBike(pricePerHour)).to.be.revertedWith("Only the owner can register a bike.");
    // });
//});

  // describe("returnBike", function () {
  //   beforeEach(async function () {
  //     // Register and rent a bike before each return test
  //     const pricePerHour = ethers.utils.parseEther("0.01");
  //     const depositAmount = ethers.utils.parseEther("0.02");
  //     console.log(pricePerHour);

  //     let tx = await bikeRental.registerBike(pricePerHour);
  //     await tx.wait();
  //     tx = await bikeRental.rentBike(0, { value: pricePerHour });
  //     await tx.wait();
  //   });

  //   it("should allow the renter to return the bike", async function () {
  //     const tx = await bikeRental.returnBike(0);
  //     await tx.wait();
  //     const bike = await bikeRental.bikes(0);
  //     expect(bike.isAvailable).to.be.true;
  //     expect(bike.currentRenter).to.equal(ethers.constants.AddressZero);
  //     // TODO: check the balance changes to ensure the correct amounts are transferred
  //   });

  //   // Add more tests for returning a bike that's not rented, by someone who isn't the renter, etc.
  // });

  describe("getData", function () {
    beforeEach(async function () {
      // Register and rent a bike before each return test
      const pricePerHour = ethers.utils.parseEther("0.01");
      const depositAmount = ethers.utils.parseEther("0.02");
      console.log(pricePerHour);
      for (let i = 0; i < 3; i++) {
        let tx = await bikeRental.registerBike(pricePerHour);
        await tx.wait();
        const personalData = ethers.utils.formatBytes32String("name (encrypted)");
        tx = await bikeRental.rentBike(i, personalData, {
          value: pricePerHour,
        });
        await tx.wait();
      }
    });

    it("should allow the owner to get overdue bikes", async function () {
      // Call getOverdueBikes() method
      const tx = await bikeRental.connect(deployer).getOverdueBikes();

      // Wait for the transaction to be mined and get the receipt
      const receipt = await tx.wait();

      // Access the overdueBikes array from the transaction receipt
      const overdueBikes = receipt.events[0].args.overdueBikes.map(
        (bytes32Value) => ethers.utils.parseBytes32String(bytes32Value)
      );

      console.log(`Overdue bikes: ${overdueBikes}`);

      const tx1 = await bikeRental.returnBike(0);
      await tx1.wait();

      // Get the size of the array
      const size = overdueBikes.length;

      // Retrieve the bytes32 content in the array
      for (let i = 0; i < size; i++) {
        const bytes32Value = overdueBikes[i];
        console.log(`Bytes32 value at index ${i}: ${bytes32Value}`);
      }

      // Assert that the returned value is correct (for example, length should be 0 since we just rented the bike)
      expect(size).to.equal(3);
    });

    // Add more tests for returning a bike that's not rented, by someone who isn't the renter, etc.
  });
});
