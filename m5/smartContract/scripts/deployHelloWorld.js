async function main() {

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello_world = await HelloWorld.deploy("Hello World");
    console.log("Contract Deployed to address: ", hello_world.address);
    console.log("Contract abi: ", hello_world.interface.format("json"));
    // save abi and address in a file
    const fs = require('fs');
    fs.writeFileSync('../frontend/src/contract-abi.json', hello_world.interface.format("json"));
    fs.writeFileSync('../frontend/src/contract-address.json', JSON.stringify({address: hello_world.address}));


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });