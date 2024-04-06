# Introduction

As explained in milestone 1 of this project, the renting protocols on which currently rely the most widely used micro-mobility services around the globe offer insufficient privacy guarantes. Indeed, these services have shifted over the past 15 years from low-tech unlinkable and untraceable systems to high tech systems collecting lots of personal information. Every user is now clearly identified through various lookup identifiers such as credit card information, address, email, phone number... Morover, each ride is completely traceable in time and location and is linked to the user's identity, enabling a powerful profiling of users. On top of that, data stored in the user's account is often retained for unspecified periods of time. For all those reasons, the databases of these service providers are goldmines of user personal information, making them a single point of failure to the identity of many citizens. We chose to focus on Montreal's bike renting system BIXI and to develop a bike renting protocol that minimally affects the user's privacy without excessively degrading the new features enabled by technology[^1].

## Our solution, PIXI

We propose an alternative to BIXI's current bike renting protocol that incorporates the core requirements of privacy by design. From now on, we will refer to this solution as PIXI. 
PIXI relies on a publicly accessible and unmodifiable smart contract[^2] that resides on the ethereum blockchain. Payments are made using Ether, which requires the user to have a Metamask[^3] wallet in order to transfer the cryptocurrency. No personal identifiers are collected by our system, and no account is necessary. PIXI's web app consists of a map of all the stations with refreshable data showing the bikes and docking stations available (this map functionality was not implemented in our prototype). 
The button "connect-wallet" enables the user to conect his metamask wallet in order to make the payments. 
The button "rent-bike" prompts the user to enter the ID engraved in the bike that he wants to rent (this could be replaced by a QR code scan similar to what BIXI currently supports). 
The user then has 2 options:
-  Paying a deposit corresponding to the price of the bike.
-  Uploading a file containing his personal info that is doubly encrypted with PIXI's and a Trusted Executing Environment's (TEE)[^4] public keys. He will also pay a samller deposit corresponding to the cost of renting the bike for 1 day (this ensures that the users has sufficient funds to pay for the rental).

There are then 2 potential scenarios:
  1. If the bike is returned within 24 hours, the deposit is refunded to the user (deducting the cost of the rental) and the user's personal information remains encrypted. The only records stored on PIXI's database are that a bike was rented from station x at time t and docked in station y at time t' (allowing for some network analysis to balance the bike distrivution).
  2. If the bike is not returned within 24 hours, the bike is considered stolen. In that case the deposit is transfered to PIXI's wallet ans the user's personal info is decrypted by the smart contract and the TEE, allowing PIXI to recover the identity of the thief. The details of this complex revocable privacy protocol will be described in a later section. 


# Design decisions

## First goal: an anonymous, unlinkable payment system.

One of PIXI's key requirements was to provide anonymous and unlinkable payments, in order to keep the user's identity out of the bike renting process. We quickly realized that this double goal would be impossible to reach. Indeed, there is currently no online payment method that provides perfect anonymity and unlinkability since the pioneer system DigiCash went bankrupt[^5]. However, we still tried to allow the user to achieve both.

### Our solution: Ether coin and Metamask

##### Why Ether coin?
In order to make this possible, we decided to use Ether coin (ETH)[^6] for the transactions. It provides the possibility for any user to create a wallet with a private/public key pair. The public key is used to derive a wallet address. Transactions between wallets are securized by the public ethereum blockchain, making ETH a secure pseudo-anonymous currency for our payments. However, transactions involving the same wallet can be linked to one another, thus the payments are not fully unlinkable. That being said, users can still achieve unlinkability by using a different wallet each time they make a payment.

##### Why Metamask?
Our prototype currently provides integration only for Ethereum wallets managed by Metamask. We chose Metamask for multiple reasons:
- It does not require any personal identifier to create wallets, keeping users fully anonymous.
- Access keys are stored locally on your device (no password recovery system).
- It is easy to set up: users only need to download the browser extension (available on Firefox, Edge, Chrome and Brave).
- It is very user friendly, making it accessible to the general public. 
- It greatly facilitates creation of wallets, which opens the path to unlinkability through the use of different wallets.
- Wallets can be anonymously loaded in ETH by going to an Ether ATM and introducing cash[^7].
- It interacts directly with the Ethereum API, which facilitates its integration to decentralized applications like PIXI.


##### Concerns
However, this comes with the disadvantage of introducing a dependancy to a third party in our system, which comes with legitimate concerns for the user. In particular, the Metamask browser extension asks for 3 permissions including the read and change all data for all websites: a massive tradeoff. However, all metamask does is inject the Ethereum Web3 API into the javascript context of every website in order to enable decentralized apps like PIXI to access blockchain data from within the browser[^8]. Metamask is open source, widely used, and they have never been flagged for an abusive use of these permissions. It has a single CVE instance in the National Vulnerability Database dating from 2022 with medium severity that has been fixed since. The user can mitigate this concern by restricting the extension to PIXI's website (or any other website where he may want to pay using ETH) in the settings of the browser. Metamask also admit collecting the IP address of users when they initiate a transaction. The IP data is required to validate the transaction with the blockchain node and is not linkable to the wallet address[^9].

##### Still better than normal banking
In spite of these concerns, we think it is reasonable to trust Metamask[^10] even though we would have preferred that they minimized their permissions by default (asking the user to opt-in to certain domains where the extension runs instead of enabling it for everything at the start). Note that PIXI's dependancy to a third party ethereum wallet like metamask is to be compared with BIXI's dependancy to online credit card payment providers. Metamask and online banking services are comparable in the sense that their use goes way beyond just PIXI or BIXI since they can be used to make transactions with potentially any other online service. The difference is that the bank stores a lot of your personal information whereas metamask only stores your wallet address.


## Second goal: a transparent, unalterable process.
We wanted to leave no ambiguity to our users about how the rental process works by making the algorithm public. We also wanted the user to have the guarantee that the system cannot be changed internally by PIXI in the middle of a rental.

### Our solution: Smart Contracts

Smart Contracts were the perfect fit as they have the double feature of being _transparent_ and _unmodifiable_.

Transparency implies that the contract itself as well as its state (invocation parameters, resulting transactions...) at any point in time is publicly accessible. As mentionned in the previous section, this does imply that PIXI could monitor the wallet addresses of each payments and link them with trips. However in our implementation, the wallet information is NOT stored internally nor is it associated with each trip to build user profiles. 
Neverhtheless, it is still much better then BIXI's current system as our PIXI can only retrieve a recognizable identifier (the wallet address) instead of a lookup identifier (credit card information).

Unmodifiability is a key property as it ensures that PIXI can never change the terms of the contract during its execution. This means that the user can know exactly what will happen at each step of the process. Note that this does not mean that PIXI will never be able to update its service. Rather, it implies that if PIXI wants to change the terms of the contract for whatever reason, it will have to deploy a new contract on a different block of the Ethereum blockchain, which the user will necessarily be aware of.

## Third goal: A privacy preserving theft prevention method
An essential requirement of bike rental services like PIXI is to ensure that bike theft is minimized and that the company gets compensated in case a bike is stolen. PIXI must hence require a collateral to initiate the rental of the bike.

### The deposit option

An easy way to enforce this is by requiring the user to make a deposit equivalent to the cost of replacing the bicycle. This option is not adapted to all users as it requires having a big amount of ETH in their wallet. However, this may be a satisfying option for hard privacy fundamentalists who don't want any personal data involved in the process. As a service centered on privacy, we felt like it was legitimate to give them this possibility. 

### The revocable privacy option

However to keep the service affordable and accessible to everyone, we developped a system that significantly reduces the amount of the deposit required, down to the cost of renting a bike for 1 day. In counterpart, the user must provide a file containing his personal data upon invocation of the smartcontract (via the rentbike function). However, we want that personal data to remain inaccessible to anyone unless the bike gets stolen. We developped a system that achieves this by using asymetric key encryption and a TEE (see footnote n4 for an explanation of this technology). This goal can be broken down in 3 subgoals:

##### Users can’t revoke access to personal data once contract is invoked

##### Only PIXI can see data if a bike is stolen

##### Data is accessible only if Bike is stolen

##### Step by step breakdown

Here's how it works in the case of a bike theft:

- The user encrypts his personal data with PIXI's public key (as well as any data sent on contract like the bikeID for example)
- The user encrypts his personal data with the TEE's public key
- The Smart Contract calls the TEE to decrypt the personal data
- BIXI decrypts the 


## Notes and bibliography
[^1]: These new features include the possibility of checking the real time availability of bikes and docks online, as well as an electronized automatic system to dock the bicycles. 

[^2]: Smart contracts are self-executing digital agreements that are hard-coded on the blockchain. Once deployed, they reside on a block and are hashed on all the subsequent blocks, which makes them _unmodifiable_. The security of the Ethereum blockchain relies on its _transparency_. Concretely, all transactions and smart contracts are made public, allowing anyone to verify the data in a peer to peer validation system. 

Source: T. Chen et al., "Understanding Ethereum via Graph Analysis," IEEE INFOCOM 2018 - IEEE Conference on Computer Communications, Honolulu, HI, USA, 2018, pp. 1484-1492, doi: 10.1109/INFOCOM.2018.8486401. keywords: {Conferences},

[^3]: Metamask is a popular cryptocurrency wallet manager and a gateway to blockchain based decentralized applications like PIXI.

[^4]: Trusted Execution Environments (TEEs) function like "black boxes" for data processing... Explain what a TEE is.

[^5]: Hoepman, J.-H. (2021). Privacy Is Hard and Seven Other Myths: Achieving Privacy through Careful Design. The MIT Press.

[^6]: Ether coin is Ethereum's native cryptocurrency. 
Source: https://ethereum.org/en/eth/

[^7]: For reference, there are 10 different ether ATMs within a 2km radius of our classroom in McGill's Adams building. Users can also acquire ETH with regular online paying methods (credit card, Paypal...) but we strongly recommend using an Ether ATM to pay with good old cash. That way there is no trace potentially linking any piece of your identity to your ethereum account other than the location of the ATM. 
Source: https://coinatmradar.com/ether-atm-map/


[^8]: https://support.metamask.io/hc/en-us/articles/12412707939611-Why-does-MetaMask-need-permission-to-modify-data-on-all-web-pages.

[^9]: https://consensys.io/blog/consensys-data-retention-update and https://support.metamask.io/hc/en-us/articles/10992445334555-Does-MetaMask-collect-my-personal-data

[^10]: This trust is shared by the authors of this publication for the IEEE: D. Pramulia and B. Anggorojati, "Implementation and evaluation of blockchain based e-voting system with Ethereum and Metamask," 2020 International Conference on Informatics, Multimedia, Cyber and Information System (ICIMCIS), Jakarta, Indonesia, 2020, pp. 18-23, doi: 10.1109/ICIMCIS51567.2020.9354310. keywords: {Performance evaluation;Multimedia systems;Reverse engineering;Blockchain;Reliability;Security;Electronic voting;Electronic voting;blockchain;smart contract;Ethereum}


