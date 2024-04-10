# Introduction

As explained in milestone 1 of this project, the renting protocols on which currently rely the most widely used micro-mobility services around the globe offer insufficient privacy guarantes. Indeed, these services have shifted over the past 15 years from low-tech unlinkable and untraceable systems to high tech systems collecting lots of personal information. Every user is now clearly identified through various lookup identifiers such as credit card information, address, email, phone number... Morover, each ride is completely traceable in time and location and is linked to the user's identity, enabling a powerful profiling of users. On top of that, data stored in the user's account is often retained for unspecified periods of time. For all those reasons, the databases of these service providers are goldmines of user personal information, making them a single point of failure to the identity of many citizens. We chose to focus on Montreal's bike renting system BIXI and to develop a bike renting protocol that minimally affects the user's privacy without excessively degrading the new features enabled by technology[^1].

## Our solution, PIXI

We propose an alternative to BIXI's current bike renting protocol that incorporates the core requirements of privacy by design. From now on, we will refer to this solution as PIXI. 
PIXI relies on a publicly accessible and unmodifiable smart contract[^2] that resides on the ethereum blockchain. Payments are made using Ether coin, which requires the user to have an ethereum wallet in order to transfer the cryptocurrency. No personal identifiers are collected by our system, and no account is necessary. PIXI's web app consists of a map of all the stations with refreshable data showing the bikes and docking stations available (this map functionality was not implemented in our prototype). 
The button "connect-wallet" enables the user to connect his ethereum wallet in order to make the payments. 
The button "rent-bike" prompts the user to enter the ID engraved in the bike that he wants to rent (this could be replaced by a QR code scan similar to what BIXI currently supports). 
The user then has 2 options:
-  Paying a deposit corresponding to the price of the bike.
-  Uploading a file containing his personal info that is doubly encrypted with PIXI's and a Trusted Executing Environment's (TEE)[^4] public keys. He will also pay a samller deposit corresponding to the cost of renting the bike for 1 day (this ensures that the users has sufficient funds to pay for the rental). 

There are then 2 potential scenarios:
  1. If the bike is returned within 24 hours, the deposit is refunded to the user (deducting the cost of the rental) and the user's personal information remains encrypted. The only records stored on PIXI's database are that a bike was rented from station x at time t and docked in station y at time t' (allowing for some network analysis to balance the bike distrivution).
  2. If the bike is not returned within 24 hours, the bike is considered stolen. In that case the deposit is transfered to PIXI's wallet ans the user's personal info is decrypted by the smart contract and the TEE, allowing PIXI to recover the identity of the thief. The details of this complex revocable privacy protocol will be described in a later section. 


# Design decisions

## First goal: an anonymous, unlinkable payment system.

One of PIXI's key requirements was to provide anonymous and unlinkable payments, in order to keep the user's identity out of the bike renting process. We quickly realized that this double goal would be impossible to reach. Indeed, there is currently no practical online payment method that provides perfect anonymity and unlinkability[^5] since the pioneer system DigiCash went bankrupt[^6]. However, we still tried to allow the user to achieve both.

### Our solution: Ether coin and Metamask

##### Why Ether coin?
In order to make this possible, we decided to use Ether coin (ETH)[^7] for the transactions. It provides the possibility for any user to create a wallet with a private/public key pair. The public key is used to derive a wallet address. Transactions between wallets are securized by the public ethereum blockchain, making ETH a secure pseudo-anonymous currency for our payments. However, transactions involving the same wallet can be linked to one another, thus the payments are not fully unlinkable. That being said, users can still achieve unlinkability by using a different wallet each time they make a payment.

##### Why Metamask?
Our prototype currently provides the option to connect the user's wallet using Metamask. We chose Metamask for multiple reasons:
- It does not require any personal identifier to create wallets, keeping users fully anonymous.
- Access keys are stored locally on your device (no password recovery system).
- It is easy to set up: users only need to download the browser extension (available on Firefox, Edge, Chrome and Brave).
- It is very user friendly, making it accessible to the general public. 
- It facilitates creation of wallets, which opens the path to unlinkability through the use of different wallets.
- Wallets can be anonymously loaded in ETH by going to an Ether ATM and introducing cash[^8].
- It interacts directly with the Ethereum API, which facilitates its integration to decentralized applications like PIXI.


##### Concerns
However, this comes with the disadvantage of introducing a dependancy to a third party in our system, which comes with legitimate concerns for the user. In particular, the Metamask browser extension asks for 3 permissions including the read and change all data for all websites: a massive tradeoff. However, all metamask does is inject the Ethereum Web3 API into the javascript context of every website in order to enable decentralized apps like PIXI to access blockchain data from within the browser[^9]. Metamask is open source, widely used, and they have never been flagged for an abusive use of these permissions. It has a single CVE instance in the National Vulnerability Database dating from 2022 with medium severity that has been fixed since. The user can mitigate this concern by restricting the extension to PIXI's website (or any other website where he may want to pay using ETH) in the settings of the browser. Metamask also admit collecting the IP address of users when they initiate a transaction. The IP data is required to validate the transaction with the blockchain node and is not linkable to the wallet address[^10].

##### Still better than normal banking
In spite of these concerns, we think it is reasonable to trust Metamask[^11] even though we would have preferred that they minimized their permissions by default (asking the user to opt-in to certain domains where the extension runs instead of enabling it for everything at the start). Note that PIXI's dependancy to a third party ethereum wallet like metamask is to be compared with BIXI's dependancy to online credit card payment providers. Metamask and online banking services are comparable in the sense that their use goes way beyond just PIXI or BIXI since they can be used to make transactions with potentially any other online service. The difference is that the bank stores a lot of your personal information whereas metamask only stores your wallet address.

##### Users could theoretically bypass Metamask
While we used Metamask to simplify the wallet connection/creation process for a non-introduced user, PIXI could provide integration for any  ethereum wallet (not just for those managed by Metamask). This would be done by asking the user to input his ethereum wallet address. We did not implement this feature because the Metamask integration was sufficient to prove that the concept was valid and functional.

## Second goal: a transparent, unalterable process.
We wanted to leave no ambiguity to our users about how the rental process works by making the algorithm public. We also wanted the user to have the guarantee that the system cannot be changed internally by PIXI in the middle of a rental. 

### Our solution: Smart Contracts
Smart Contracts were the perfect fit as they have the double feature of being _transparent_ and _unmodifiable_.

Transparency implies that the contract itself as well as its state (invocation parameters, resulting transactions...) at any point in time is publicly accessible. As mentionned in the previous section, this does imply that PIXI could monitor the wallet addresses of each payments and link them with trips. However in our implementation, the wallet information is NOT stored internally nor is it associated with each trip to build user profiles. 
Neverhtheless, it is still much better then BIXI's current system as our PIXI can only retrieve a recognizable identifier (the wallet address) instead of a lookup identifier (credit card information). But the true benefit of full transparency comes from the fact that the user himself has access to the different states of the contract. This is crucial in one particular (unlikely) scenario: if PIXI decides for some reason to block the call informing the smart contract that the bike was returned after the user docked it, whether that is inetentionally (to keep the collateral) or unintentionaly (docking system failure). Then the user could see that the bike is not marked as returned on the contract and challenge PIXI[^12].

Unmodifiability is a key property as it ensures that PIXI can never change the terms of the contract during its execution. This means that the user can know exactly what will happen at each step of the process. Note that this does not mean that PIXI will never be able to update its service. Rather, it implies that if PIXI wants to change the terms of the contract for whatever reason, it will have to deploy a new contract on a different block of the Ethereum blockchain, which the user will necessarily be aware of.

## Third goal: A privacy preserving theft prevention method
An essential requirement of bike rental services like PIXI is to ensure that bike theft is minimized and that the company gets compensated in case a bike is stolen. PIXI must hence require a collateral to initiate the rental of the bike.

### The deposit option

An easy way to enforce this is by requiring the user to make a deposit equivalent to the cost of replacing the bicycle. This option is not adapted to all users as it requires having a big amount of ETH in their wallet. However, this may be a satisfying option for hard privacy fundamentalists who don't want any personal data involved in the process. As a service centered on privacy, we felt like it was legitimate to give them this possibility. 

### The revocable privacy option

However to keep the service affordable and accessible to everyone, we developped a system that significantly reduces the amount of the deposit required, down to the cost of renting a bike for 1 day. In counterpart, the user must provide a file containing his personal data upon invocation of the smartcontract (via the rentbike function). However, we want that personal data to remain inaccessible to anyone unless the bike gets stolen. We developped a system that achieves this by using asymetric key encryption and a TEE (see footnote n4 for an explanation of this technology). This goal can be broken down in 3 subgoals:

##### Users can’t revoke access to personal data once contract is invoked

Our initial strategy for maintaining user anonymity during the contract involved storing their personal information in a Personal Data Store[^13] (PDS). Users would request proof of their data being stored in the PDS, which they would then send to PIXI. According to contractual agreements, PIXI would access this data only if necessary (when the bike is not returned). Users could protect themselves by using the PDS's logs. However, the PDS lacked the authority to refuse a user's request to revoke their data, even if they were bound by a contractual agreement with a third party. This meant that a user could rent a bike and subsequently remove their personal information from the platform. Faced with this challenge, we had to preserve a copy of the user's personal data within the contract. Since the execution of the contract is _unalterable_, there is no way for the user to remove or modify his personal information after the bike was rented.

##### Only PIXI can see data if a bike is stolen

Since we decided to keep a copy of the personal data within the process, it is our obligation to securely store and process this data. Meaning that the personal information should not be disclose to the public. Therefore, we must encrypt the data that goes on the smart contract from external users. We achieved this by using asymmetric encryption[^14].

##### Data is accessible only if Bike is stolen

To implement privacy-unless, we ensure that the user's privacy remains intact until specific conditions are met. We employ an off-chain third-party[^15] charged of decrypting the user's personal data for this purpose. To maximize the user's security, we require that the third-party uses Trusted Execution Environment technology to store their private key. Utilizing a TEE for decryption offers heightened security compared to relying solely on a server. The TEE creates a secure enclave within the processor, isolating decryption processes from the broader system. This isolation ensures that sensitive decryption keys and operations remain protected from unauthorized access or tampering, even if the server's operating system is compromised by malware or malicious actors. It is crucial that the TEE can be called for decryption of personal data only by the smart contract itself. This is ensured by checking the provenance of the caller before any decryption happends. We also require audit logs to track all act of decryption. However, nothing except reputation prevents collusion between the third-party and PIXI.

### Data in Transit

Our aim is to securely acquire data from an identity provider[^16] to ensure its accuracy while preserving its confidentiality. To accomplish this, we implement a multi-layered encryption process. Initially, the identity provider encrypts the data using PIXI's public key, then the data undergoes additional encryption using the Trusted Execution Environment's public key. After encryption, the identity provider adds a digital signature[^17] to authenticate the data.

The signed data is then presented to a smart contract for verification, providing transparency to all parties involved. Users are informed of the conditions under which their data may be disclosed through the visibility of the smart contract. If the bike is returned on time, the smart contract abstains from transmitting the data for decryption. However, if the contract is breached, indicating a deviation from the specified conditions, the TEE will be called to decrypt the data.

It's important to note that PIXI cannot decrypt the data unless the contract is breached due to the TEE encryption. Furthermore, the third party cannot access the decrypted data as it remains encrypted using PIXI's key within the contract. The precise order of encryption is paramount. Although our system does not enable perfect forward secrecy, the double layer of encryption (by both PIXI and the TEE) that persists in most cases (all except when the bike is stolen) greatly limits the risk of the user's personnal data becoming available to the general public since both keys would need to be compromised for that to happen.

## Architecture !!

I would add an Architecture section to talk about the requirements of each system and how they interact with each other

## Compliance

It is easy for PIXI's privacy officer to show compliance with law 25 since the different states of the contract are publicly accessible. 

## Conclusion

By developping PIXI, we have shown that it is possible to build a micro-mobility app that offers very strong privacy guarantees to users. However, we are aware of the limitations that our prototype service may face in a real world context. Indeed, we have had to sacrifice some speed and comfort for the user in order to fulfill our privacy requirements. Although citizens claim to care more about their privacy, they are still reluctant to accepting the sometimes necessary tradeoffs to an enhanced privacy. This is called the privacy paradox[^18].

Regardless, we hope that this proof of concept will serve as a baseline to be improved by other software developpers looking to enhance the privacy of users in the micro-mobility sector.

The success of PIXI in a real world context relies on several assumptions/third parties that we have listed here clarity:
1. Users are not scared off by the use of cryptocurrency and creates their ethereum wallet in a privacy preserving way (i.e with Metamask).
2. The increased cost and latency enduced by the use of a smart contract and cryptocurrency remain tolerable for the user.
3. There exists a trustable third party authority (i.e. the government) that has access to the user's identity and can provide it PIXI (doubly encrypted with the TEE's and PIXI's public keys and signed to guarantee authenticity and integrity).
4. There exists a trusted third-party authority (see footnote 14) that hosts a server using a TEE and that does not divulgate its private key.

## Notes and bibliography
[^1]: These new features include the possibility of checking the real time availability of bikes and docks online, as well as an electronized automatic system to dock the bicycles. 

[^2]: Smart contracts are self-executing digital agreements that are hard-coded on the blockchain. Once deployed, they reside on a block and are hashed on all the subsequent blocks, which makes them _unmodifiable_. The security of the Ethereum blockchain relies on its _transparency_. Concretely, all transactions and smart contracts are made public, allowing anyone to verify the data in a peer to peer validation system. 
Source: T. Chen et al., "Understanding Ethereum via Graph Analysis," IEEE INFOCOM 2018 - IEEE Conference on Computer Communications, Honolulu, HI, USA, 2018, pp. 1484-1492, doi: 10.1109/INFOCOM.2018.8486401. keywords: {Conferences},

[^3]: Metamask is a popular cryptocurrency wallet manager and a gateway to blockchain based decentralized applications like PIXI.

[^4]: A Trusted Execution Environment (TEE) is a segregated area of memory and CPU that is protected from the rest of the CPU using encryption, any data in the TEE can't be read or tampered with by any code outside that environment. Data can be manipulated inside the TEE by suitably authorized code. 
Source: https://learn.microsoft.com/en-us/azure/confidential-computing/trusted-execution-environment

[^5]: It can be argued that privacy coins are a type of unlinkable anonymous cryptocurrencies but their scope of use is limited and was not realistically implementable in our project.
Source: T. Zhang, "Privacy Evaluation of Blockchain Based Privacy Cryptocurrencies: A Comparative Analysis of Dash, Monero, Verge, Zcash, and Grin," in IEEE Transactions on Sustainable Computing, vol. 8, no. 4, pp. 574-582, Oct.-Dec. 2023, doi: 10.1109/TSUSC.2023.3303180.
keywords: {Privacy;Blockchains;Bitcoin;Receivers;Information integrity;Information filtering;Data privacy;Anonymity;blockchain;privacy;Bitcoin;Zcash;Monero}, 

[^6]: The story of this innovative online payment company is described in section 7.1 of this book: Hoepman, J.-H. (2021). Privacy Is Hard and Seven Other Myths: Achieving Privacy through Careful Design. The MIT Press.

[^7]: Ether coin is Ethereum's native cryptocurrency. 
Source: https://ethereum.org/en/eth/

[^8]: For reference, there are 10 different ether ATMs within a 2km radius of our classroom in McGill's Adams building. Users can also acquire ETH with regular online paying methods (credit card, Paypal...) but we strongly recommend using an Ether ATM to pay with good old cash. That way there is no trace potentially linking any piece of your identity to your ethereum account other than the location of the ATM. 
Source: https://coinatmradar.com/ether-atm-map/

[^9]: Source: https://support.metamask.io/hc/en-us/articles/12412707939611-Why-does-MetaMask-need-permission-to-modify-data-on-all-web-pages.

[^10]: Source: https://consensys.io/blog/consensys-data-retention-update and https://support.metamask.io/hc/en-us/articles/10992445334555-Does-MetaMask-collect-my-personal-data

[^11]: This trust is shared by the authors of this publication for the IEEE: D. Pramulia and B. Anggorojati, "Implementation and evaluation of blockchain based e-voting system with Ethereum and Metamask," 2020 International Conference on Informatics, Multimedia, Cyber and Information System (ICIMCIS), Jakarta, Indonesia, 2020, pp. 18-23, doi: 10.1109/ICIMCIS51567.2020.9354310. keywords: {Performance evaluation;Multimedia systems;Reverse engineering;Blockchain;Reliability;Security;Electronic voting;Electronic voting;blockchain;smart contract;Ethereum}

[^12]: Note that we did not implement such a "challenge" feature in our prototype. However users could always pursue PIXI in court or harm their reputation online by revealing a photo proving that they docked their bike in time but that the contract was not called to validate the user's respect of the terms.

[^13]: Source: https://medium.com/mydex/what-is-a-personal-data-store-a583f7ef9be3

[^14]: Asymmetric Encryption uses two distinct, yet related keys. One key, the Public Key, is used for encryption and the other, the Private Key, is for decryption. As implied in the name, the Private Key is intended to be private so that only the authenticated recipient can decrypt the message. Source: https://cheapsslsecurity.com/blog/what-is-asymmetric-encryption-understand-with-simple-examples/

[^15]: Any company hosting servers with TEEs could fulfill this role. Since all the data they receive is encrypted with PIXI's key, the only privacy risk would come from a leak of this server's private key to PIXI or of PIXI's private key to the company hosting the TEE. 

[^16]: An identity provider (IdP) is a service that stores and verifies user identity. Here we make the assumption that there is a trusted authority such as the government who has access to the user's personal information and can provide it to PIXI after having encrypted the data with the appropriate public keys. Source: https://www.cloudflare.com/en-ca/learning/access-management/what-is-an-identity-provider/ 

[^17]: A digital signature is a mathematical technique used to validate the authenticity and integrity of a digital document, message or software. Source: https://www.techtarget.com/searchsecurity/definition/digital-signature

[^18]: When it comes to privacy, users tend to value short term gains over long term losses. This idea is developped in section 2.2.2 of this book: Knijnenburg, B. P., Page, X., Wisniewski, P., Lipford, H. R., Proferes, N., & Romano, J. (Eds.). (2022). Modern Socio-Technical Perspectives on Privacy (1st ed.). Springer Cham. https://doi.org/10.1007/978-3-030-82786-1
