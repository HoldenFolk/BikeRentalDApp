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


In our comparative analysis of privacy practices among various bike-sharing services, our Bixi emerges as the most privacy-conscious operator. Unlike Citi Bike NYC, Lime Bike, and Mobi Bikes, our Bixi implementation does not require customers to provide a phone number or email address for service usage. Additionally, our Bixi implementation is unique in its commitment to not collecting location data or any personal information from its users, a significant distinction from its competitors. Furthermore, our Bixi version assures that no data regarding the users' devices or browsers is amassed, a standard of privacy not upheld by the other services examined.

In terms of legal compliance with Canadian privacy laws, our Bixi and Mobi Bikes both adhere to the Personal Information Protection and Electronic Documents Act (PIPEDA), demonstrating a robust approach to user data protection within Canadian jurisdiction. In contrast, Citi Bike NYC and Lime Bike, both operating under the jurisdiction of the United States, with Lime Bike additionally functioning globally, do not assert compliance with PIPEDA, which is to be expected.

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
In the context of our application, stakeholders are identified primarily as the users, the city, and the company. The success of our application is contingent upon the synergistic satisfaction of needs, concerns and requirements of all primary stakeholders. Below is an analysis of each stakeholder category:


1. Users:
The users are the direct interactors with the application. Their primary interests lie in the utility, usability, efficiency, and reliability of the software. They require a user-friendly interface, quick access to information, and assurance that their data are handled with the utmost security and privacy. The feedback from this demographic is crucial for enhancements and dictates the direction of future development efforts.


2. The City:
The city, representing the public sector's interests, is a key stakeholder due to its regulatory and facilitative roles. It is concerned with how the application serves the public good, complies with local regulations, promotes sustainable transportation, and integrates with the existing urban infrastructure. The city may also look at the software's impact on traffic, urban planning, and its potential to provide data to support decision-making processes.


3. The Company:
The company behind the application is the driving force of the system's inception, design, development, and maintenance. Its interests are multifaceted, including achieving business objectives, ensuring a return on investment, maintaining a positive brand image, and fostering customer loyalty. The company must balance profitability with corporate social responsibility and adherence to legal and ethical standards.


Interdependency of Stakeholders:
The users, city, and company are interdependent, with each group's satisfaction contributing to the overall value and viability of the application. User satisfaction can lead to increased adoption rates, which align with the company's commercial goals and the city's objectives for efficient urban mobility solutions. Conversely, the city's support for the application through infrastructure and policy can amplify user adoption and retention, thereby enhancing the company's market position.


## Architectural Design Decisions and Models
 
Our design is to create a new bike-sharing platform while respecting the principles of privacy by design to build an application that provides complete anonymity to the user. This application, running on a decentralized blockchain network, will not require any personal identifiers to use at the sacrifice of some minor features.
 
Represented below is the UML class diagram that describes the structure of the application.
![](https://lh7-us.googleusercontent.com/kPXV3D3WiLV0y1w4IcFXXpPn5rcWZBvfCpxcE4-M5oNJyeqRVq8Sj_wZF_ziYlyEoCn2QKKdCf59nbABhsDz7POUNtOeVjwes_xWXSZiKVjX1hWxkOKQ6qiD-lxaK9CobIknfSTpZjisHRadBJhPxSk)
 
The UML class diagram outlines how we plan to implement the privacy-centered system. The application will allow users to create an account; however, no personal identifiers will be required to sign up. Instead of the typical payment information stored for credit card transactions, our application looks to make all payments over the blockchain. These privacy improvements ensure complete anonymity while sacrificing minor accessibility to the user.

Furthermore, the application will utilize a smart contract to ensure that late/missing bike fees can still be collected through the decentralized system. The application will use Ethereum as the blockchain coin to implement the smart contract and payment. Ethereum already supports decentralized applications and has languages like Solidity for creating smart contracts. 

The user must link an Ethereum wallet to make payments within the application. To facilitate this, we will connect MetaMask with the application to create and ensure proper transactions. 


## Important scenarios


The main scenario that the application will facilitate will be the one-time rental of a bike. We will prompt users to link their Ethereum wallet to their pre-existing account. Next, the user will choose a bike and initiate a smart contract with that specific bike. The appropriate amount is deducted from the user's wallet to start the bike trip. Once the user returns the bike to a station, a response is sent to the smart contract, and the trip terminates. Most of the Ethereum held in the smart contract returns to the user's wallet upon trip completion. 

The application will also include account creation and subscription management. Users will have to create an account using a unique username and password. This account will store no personal information other than an optional email for password recovery. The account will save information like trip history and subscription status for user convenience. Even though trip history is stored, no personal information linking users to their trips will be accessible to the application. 

Another key application element will be retrieving late and lost bike fees. The application will use a smart contract to retrieve these fees. This contract will withhold a certain amount of currency as collateral until the user terminates the trip by returning their bike. The lost bike fee is only refunded if the trip is terminated after a specific time frame. The fee collection is a limitation on the user as they must pay it before every rental. 

![](https://cdn.discordapp.com/attachments/1202351672194773062/1213284458472407050/UMLDiagram.JPG?ex=65f4ea34&is=65e27534&hm=e562ccad0fefa9f08c85a54fb40e24a236b06c62464799ade0546493c8aaacbc&)





