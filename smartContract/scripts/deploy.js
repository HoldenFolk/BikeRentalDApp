const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("BikeRental");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Contract Deployed to address: ", contract.address);

  // Write the contract's address and ABI
  const frontendDir = __dirname + "/../frontend/src/contracts";
  if (!fs.existsSync(frontendDir)){
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  fs.writeFileSync(
    `${frontendDir}/contract-address.json`,
    JSON.stringify({ ContractAddress: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("BikeRental");

  fs.writeFileSync(
    `${frontendDir}/BikeRental.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
