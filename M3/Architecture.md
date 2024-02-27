# Milestone 3: Requirements and Design


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




