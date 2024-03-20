import { expect } from "chai";
import pkg from 'hardhat';
const { ethers } = pkg;;

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

  describe("checkDeployment", function () {
    it("should know the owner of the deployment", async function () {
      expect(await bikeRental.getOwner()).to.equal(deployer.address)
    });
  });


  describe("registerBike", function () {
    it("should allow the owner to register a bike", async function () {
        // Initial total bikes should be 0
        let totalBikes = await bikeRental.totalBikes();
        expect(totalBikes.toString()).to.equal("0");

        // Register a bike as the owner
        const pricePerHour = ethers.utils.parseEther("0.01"); // Example price
        const tx = await bikeRental.registerBike(pricePerHour);
        await tx.wait();

        // Check total bikes is now 1
        totalBikes = await bikeRental.totalBikes()
        expect(totalBikes.toString()).to.equal("1");

        // Verify bike details
        const bike = await bikeRental.bikes(0);
        expect(bike.isAvailable).to.equal(true);
        expect(bike.pricePerHour.toString()).to.equal(pricePerHour.toString());
    });

    // it("should fail if a non-owner tries to register a bike", async function () {
    //     const pricePerHour = ethers.utils.parseEther("0.01");
    //     // Attempt to register a bike as a non-owner, should be reverted
    //     await expect(bikeRental.connect(renter).registerBike(pricePerHour)).to.be.revertedWith("Only the owner can register a bike.");
    // });
});

  describe("rentBike", function () {
    beforeEach(async function () {
      // Register a bike before each rent test
      const pricePerHour = ethers.utils.parseEther("0.01");
      const tx = await bikeRental.registerBike(pricePerHour);
      await tx.wait();
    });

    it("should let a user rent an available bike", async function () {
      const pricePerHour = ethers.utils.parseEther("0.01");
      const tx = await bikeRental.rentBike(0, { value: pricePerHour });
      await tx.wait();
      const bike = await bikeRental.bikes(0);
      expect(bike.isAvailable).to.be.false;
      expect(bike.currentRenter).to.equal(deployer.address);
    });

    // Add more tests here for different scenarios, such as trying to rent a non-existent bike,
    // renting without enough deposit, etc.
  });

  describe("returnBike", function () {
    beforeEach(async function () {
      // Register and rent a bike before each return test
      const pricePerHour = ethers.utils.parseEther("0.01");
      const depositAmount = ethers.utils.parseEther("0.02");
      console.log(pricePerHour);

      let tx = await bikeRental.registerBike(pricePerHour);
      await tx.wait();
      tx = await bikeRental.rentBike(0, { value: pricePerHour });
      await tx.wait();
    });

    it("should allow the renter to return the bike", async function () {
      const tx = await bikeRental.returnBike(0);
      await tx.wait();
      const bike = await bikeRental.bikes(0);
      expect(bike.isAvailable).to.be.true;
      expect(bike.currentRenter).to.equal(ethers.constants.AddressZero);
      // TODO: check the balance changes to ensure the correct amounts are transferred
    });

    // Add more tests for returning a bike that's not rented, by someone who isn't the renter, etc.
  });
});
