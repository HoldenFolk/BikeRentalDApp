async function main() {

    const BikeRental = await ethers.getContractFactory("BikeRental");
    const bike_rental = await BikeRental.deploy();
    console.log("Contract Deployed to address: ", bike_rental.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });