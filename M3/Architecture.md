# Milestone 3: Requirements and Design

## System Purpose and scope


The main purpose of bike sharing systems is to offer a key-in-hand soft-mobility solution to people looking to commute by bike in a metropolitan area. The concept relies on a few of key aspects:
- Functional bikes
- Affordable
- Vast network of stations.
- Balanced bike distribution on the network (some occupied and some free docks in each station)
- User-friendly bike rental/return protocol


We will aim to achieve all of this without condemning the user to give up huge chunks of his privacy, which as we saw in deliverable 1, is currently the trade-off we have to resign ourselves to as citizens.


Of course, the first 3 aspects mentioned are beyond the scope of this project as do not aim to launch a new bike-sharing system rival to BIXI. Instead, we place ourselves in the position of developers hired by BIXI to rebuild the infrastructure of their system in compliance with the principles of privacy by design. We will hence focus on developing an account management/payment protocol that achieves effective user privacy without excessively degrading the user experience. 

To summarize, the scope of our project will be limited to the following points:
- Develop a convenient bike renting/return protocol.
- Discourage bike theft (key to maintain affordable service)
- Collect data on the occupation of stations (essential to keep a balanced network)



## Similar Systems
The following table shows the main differences between our Bixi implementation and some popular bike sharing companies in North America.
 
| Feature                                            | Our Bixi     | Citi Bike NYC | Lime Bike    | Mobi Bikes   |
|----------------------------------------------------|:------------:|:-------------:|:------------:|:------------:|
| No phone number or email needed                    | ✅           | ❌           | ❌           | ❌           |
| No location information collected                     | ✅           | ❌           | ❌           | ❌           |
| No sharing of personal information                 | ✅           | ❌           | ❌           | ❌           |
| No information about browser, computer or mobile device collected | ✅           | ❌           | ❌           | ❌           |
| PIPEDA compliance                                  | ✅           | ❌           | ❌           | ✅           |
| Jurisdiction                                       | Canada       | USA          | USA (Many places in the world) | Canada         |


## Functional Requirements Without Subscription
 
### User Registration : 
    -   no account
### Bike
    -   bikes should be docked 
    -   the only way the bike can be undocked is using a smart contract
    -   it should be easy to create a smart contract with a certain bike
    -   the bike should have a way to measure usage fees for the smart contract (oracles?)
    -   the bike issues a session id to the user 
### Blockchain Network
    -   make sure the blockchain network is secure
    -   make sure it can run in an appropriate amount of time
    -   we chose ethereum
### Smart Contract
    -   make the contracts detailed and not overly complicated 
    -   make the contracts fast and easy for Users
    -   make the contracts robust (what if a bike is not docked properly)
    -   make contracts easily accessable to owner (see state of the trip)
    -   log every trip with its session id
### Payment
    -   payment is manage by the smart contract
    -   there should be a second policy regarding the case of unexpected scenarios

## Functional Requirements With Subscription
 
### User Registration : 
    -   no account
### Bike
    -   bikes should be docked 
    -   the only way the bike can be undocked is using a smart contract
    -   it should be easy to create a smart contract with a certain bike
    -   the bike should have a way to measure usage fees for the smart contract (oracles?)
    -   the bike issues a session id to the user for a period of 24h
### Blockchain Network
    -   make sure the blockchain network is secure
    -   make sure it can run in an appropriate amount of time
    -   we chose ethereum
### Smart Contract
    -   smart contract receives public key of a user as proof of their Subscription
    -   database verifies public key correctness
    -   make the contracts detailed and not overly complicated 
    -   make the contracts fast and easy for Users
    -   make the contracts robust (what if a bike is not docked properly)
    -   make contracts easily accessable to owner (see state of the trip)
    -   log every trip with its session id
### Payment
    -   payment is manage by the smart contract
    -   there should be a second policy regarding the case of unexpected scenarios


## Privacy Requirements Without Subscription
 
## Data Minimization
    -   no personal information is collected

## Identification / Anonymization
    -   it sould be impossible for anyone to identify a user looking at the trip Data
## Data Retention
    -   since no identifiers or quasi identifiers are collected on the trips then all the trip data is preserved 

## Privacy Requirements With Subscription
 
## Data Minimization
    -   database keeps the public key of a user for the period of a subscripion

## Identification / Anonymization
    -   it sould be impossible for anyone to identify a user looking at the trip Data
## Data Retention
    -   quasi identifier with the public key of the user is it preserved for a month


## Stakeholders
 
O

## Architectural Design Decisions and Models
 


Our design looks to create a new bike sharing platforms while respecting the principals of privacy by design to build a application that provides complete anonymity to the user. This application, running on a decentralized blockchain network, will not require any personal identifiers to use at the sacrifice of some minor features.
 
Represented below is the UML class diagram that describes the structure of the application.


![](https://lh7-us.googleusercontent.com/kPXV3D3WiLV0y1w4IcFXXpPn5rcWZBvfCpxcE4-M5oNJyeqRVq8Sj_wZF_ziYlyEoCn2QKKdCf59nbABhsDz7POUNtOeVjwes_xWXSZiKVjX1hWxkOKQ6qiD-lxaK9CobIknfSTpZjisHRadBJhPxSk)
 


The UML diagram outlines how we plan to implement the privacy centered system. The application will allow users to create an account; however, no personal identifiers will be required to sign up. Instead of the typical payment information stored to make credit card transactions, our application looks to make all payments over blockchain. This ensures complete anonymity while sacrificing minor accessibility to the user. 


Furthermore, the application will utilize a smart contract to ensure that late/missing bike fees can still be collected through the decentralized system. To facilitate these features, the application will use Ethereum as the blockchain coin. Ethereum already has support for decentralized applications and has languages like Solidity for creating smart contracts. 


The user will now have to create and link a wallet to make payments within the application. To facilitate this, we will connect MetaMask with the application to create and ensure proper transactions. 


The entire application will run on a react font-end with a node.js backend. 




## Important Scenarios


One key element of the application will be the retrieval of late fees and lost bike fees. To account for this scenario, the application will use a smart contract to handle transactions. This contract will withhold a certain amount of currency as collateral until the user terminates the trip by returning their bike. If the trip is not terminated after a certain time frame then the lost bike fee is not returned to the user. This imposes a limitation on the user as they must pay this fee before every rental. 




