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


## Design decisions

### First goal: an anonymous, unlinkable payment system.

One of PIXI's key requirements was to provide anonymous and unlinkable payments, in order to keep the user's identity out of the bike renting process. We quickly realized that this double goal would be impossible to reach. Indeed, there is currently no online payment method that provides perfect anonymity and unlinkability since the pioneer system DigiCash went bankrupt[^5]. However, we still tried to allow the user to achieve both.

#### Our solution: Ether coin and Metamask

#### Why Ether coin?
In order to make this possible, we decided to use Ether coin (ETH)[^6] for the transactions. It provides the possibility for any user to create a wallet with a private/public key pair. The public key is used to derive a wallet address. Transactions between wallets are securized by the public ethereum blockchain, making ETH a secure pseudo-anonymous currency for our payments. However, transactions involving the same wallet can be linked to one another, thus the payments are not fully unlinkable. That being said, users can still achieve unlinkability by using a different wallet each time they make a payment.

#### Why Metamask?
Our prototype currently provides integration only for Ethereum wallets managed by Metamask. We chose Metamask for multiple reasons:
- It does not require any personal identifier to create wallets, keeping users fully anonymous.
- Access keys are stored locally on your device (no password recovery system).
- It is easy to set up: users only need to download the browser extension (available on Firefox, Edge, Chrome and Brave).
- It is very user friendly, making it accessible to the general public. 
- It greatly facilitates creation of wallets, which opens the path to unlinkability through the use of different wallets.
- Wallets can be anonymously loaded in ETH by going to an Ether ATM and introducing cash[^7].
- It interacts directly with the Ethereum API, which facilitates its integration to decentralized applications like PIXI.

However, this comes with the disadvantage of introducing a dependancy to a third party in our system, which comes with legitimate concerns for the user. In particular, the Metamask browser extension asks for 3 permissions including the read and change all data for all websites: a massive tradeoff. However, all metamask does is inject the Ethereum Web3 API into the javascript context of every website in order to enable decentralized apps like PIXI to access blockchain data from within the browser[^8]. Metamask is open source, widely used, and they have never been flagged for an abusive use of these permissions. It has a single CVE instance in the National Vulnerability Database dating from 2022 with medium severity that has been fixed since. The user can mitigate this concern by restricting the extension to PIXI's website (or any other website where he may want to pay using ETH) in the settings of the browser. Metamask also admit collecting the IP address of users when they initiate a transaction. The IP data is required to validate the transaction with the blockchain node and is not linkable to the wallet address[^9].

In spite of these concerns, we think it is reasonable to trust Metamask[^10] even though we would have preferred that they minimized their permissions by default (asking the user to opt-in to certain domains where the extension runs instead of enabling it for everything at the start). Note that PIXI's dependancy to a third party ethereum wallet like metamask is to be compared with BIXI's dependancy to online credit card payment providers. Metamask and online banking services are comparable in the sense that their use goes way beyond just PIXI or BIXI since they can be used to make transactions with potentially any other online service. The difference is that the bank stores a lot of your personal information whereas metamask only stores your wallet address.


### Second goal: a transparent, unalterable process.
We wanted to leave no ambiguity to our users about how the rental process works by making the algorithm public. We also wanted the user to have the guarantee that the system cannot be changed internally by PIXI in the middle of a rental.

#### Our solution: Smart Contracts

Smart Contracts were the perfect fit as they have the double feature of being _transparent_ and _unmodifiable_.

Transparency implies that the contract itself as well as its state (invocation parameters, resulting transactions...) at any point in time is publicly accessible. As mentionned in the previous section, this does imply that PIXI could monitor the wallet addresses of each payments and link them with trips. However in our implementation, the wallet information is NOT stored internally nor is it associated with each trip to build user profiles. 
Neverhtheless, it is still much better then BIXI's current system as our PIXI can only retrieve a recognizable identifier (the wallet address) instead of a lookup identifier (credit card information).

Unmodifiability is a key property as it ensures that PIXI can never change the terms of the contract during its execution. This means that the user can know exactly what will happen at each step of the process. Note that this does not mean that PIXI will never be able to update its service. Rather, it implies that if PIXI wants to change the terms of the contract for whatever reason, it will have to deploy a new contract on a different block of the Ethereum blockchain, which the user will necessarily be aware of.

### Third goal: A privacy preserving theft prevention method
An essential requirement of bike rental services like PIXI is to ensure that bike theft is minimized and that the company gets compensated in case a bike is stolen. PIXI must hence require a collateral to initiate the rental of the bike.

#### The deposit option

An easy way to enforce this is by requiring the user to make a deposit equivalent to the cost of replacing the bicycle. This option is not adapted to all users as it requires having a big amount of ETH in their wallet. However, this may be a satisfying option for hard privacy fundamentalists who don't want any personal data involved in the process. As a service centered on privacy, we felt like it was legitimate to give them this possibility. 

#### The revocable privacy option






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

[^10]: This trusted is shared by the authors of this publication for the IEEE: D. Pramulia and B. Anggorojati, "Implementation and evaluation of blockchain based e-voting system with Ethereum and Metamask," 2020 International Conference on Informatics, Multimedia, Cyber and Information System (ICIMCIS), Jakarta, Indonesia, 2020, pp. 18-23, doi: 10.1109/ICIMCIS51567.2020.9354310. keywords: {Performance evaluation;Multimedia systems;Reverse engineering;Blockchain;Reliability;Security;Electronic voting;Electronic voting;blockchain;smart contract;Ethereum}


Alchemy is software that connects your smart contract to blockchain (mines the blockchain).
What smart contracts are and how they work. Secure on the bockchain.

When rent bike pressed, metamask sends money from your ethereum wallet to smart contract. When contract ends, sends the payment to Bixi's ethereum account. 


Privacy implications:
Achieved separation, key privacy improvement.


Limitations of Ethereum that puts every transaction public on the blockchain. Currently, BIXI could link separate transactions coming from the same user by retrieving the wallet ID or the execution of the contract. They would still have no idea who you are.
Unlinkability: Change wallet address between transactions.
Possible improvement in mind: Change the infrastructure of our project from ethereum to a more private crypto currency like monero which would make the transactions fully unlinkable.

Currently: 
Metamask:
Access to your payment method, wallet IDs, Transaction history on the smart contract.



Our solution relies on the blockchain to implement an unlinkable payment. The smart contract works as an interface between the user and BIXI. It collects the user's payment in a totally anonymous way and deposits it to BIXI in exchange for the freeing of the bike.

Testing a commit

# blockchain

### can we justify the decision of using the blockchain instead of the traditional payement method

***Pros/Cons***

<p>

***+*** Bixi does not have access to your real name (the name on your card), as soon as you make a transaction using a debit or credit card the company automatically has access to the name on the card thus your REAL name since normally the bank verifies that this name is trully yours <br>
***+*** since we are using privacy coins, the user's transaction history is hidden, compared to lets say visa seing you make 10 bixi payment/week<br>
***-*** less user-friendly <br>
***To explore 1*** different kind of wallet which should we use? keeping in mind that this is not a crypto service, but a bike rental service <br>
<ul>
  <li>what are the security risks? A: </li>
  <li>what are the privacy threats? A: </li>
  <li>how practical is it really (performance: speed,complexity)? A: </li>
  <li>how to keep currency stable? A: use Stablecoins</li>
  </ul>
</p>



### so far, we plan on using smart contracts the following way 
<ol>
  <li>SmartContract(deposit, bikeid) 
  <ul>
  <li>creates smartcontract given the deposit and bikeid</li>
  </li>
  </ul>
  <li>the smart contract ask bixi to unlock the bike, then start a timer</li>
  <li>bikeReturned(bikeid, timer) 
  <ul>
  <li>calculates the fees</li>
  </ul>
  </li>
  <li>user_receives(fees) 
  <ul>
  <li>user receives deposit - fees, bixi receives fees</li>
  </ul>
  </li>
  <li>timer_expired(bikeid) // send notif to bixi, bixi receives the deposit money</li>
</ol>

***Pros/Cons***

<p>

***+*** bixi does not know any personal info <br>
***+*** users are protected by bixi's reputation <br>
***-*** users are not protected if bixi has malicous intent (don't finish contract when bike is returned) <br>
***-*** users can be tracked by public wallet address (linkability of trips) <br>
***-*** large deposit, not cheap <br>
</p>

### using privacy coins
***+*** users arte not unlinkable on the blockchain, i.e there trip history cannot be retrieved
- https://www.chainalysis.com/blog/privacy-coins-anonymity-enhanced-cryptocurrencies/

### alternative involving revocable privacy potential strategy
<ol>
  <li>SmartContract(personal info, bikeid)</li>
  <li>the smart contract ask bixi to unlock the bike, then start a timer</li>
  <li> bikeReturned(bikeid, timer) <ul>
  <li>calculates the fees</li>
  </ul></li>
  <li> user_receives(fees) <ul>
  <li>user's info stay encrypted, bixi receives fees</li>
  </ul></li>
  <li>timer_expired(bikeid)<ul>
  <li>send notif to bixi, bixi receives the personal info and tries to reach you</li>
  </ul></li>
</ol>

***Pros/Cons***

<p>
+ no deposit, cheaper <br>
+ althought the fees are calculated by Bixi, user can put a limit to their wallet <br>
+ users can't be tracked (privacy coins scenario) <br>
- how can the company trust the personal data ?<br>
- external user can see personal data (transaction is public on blockchain)<br>
</p>

### alternative of encrypting personal data
<ol>
  <li>SmartContract(encrypted personal info, bikeid)
  <li>the smart contract ask bixi to unlock the bike, then start a timer</li>
  </li>
  <li>bikeReturned(bikeid, timer) // calculates the fees</li>
  <li>user_receives(fees) // user's info stay encrypted, bixi receives fees</li>
  <li>timer_expired(bikeid) // send notif to bixi, bixi decrypts the personal info and tries to reach you</li>
</ol>

***new Pros/Cons***

<pr>

***+*** external user can't see the personal data since the data is encrypted <br>
***-*** how can the company trust the personal data ? <br>
***-*** let's day you use RSA, how can the user be certain Bixi won't decrypt the data at the beginning? <br>
</p>

### alternative signed encrypted personal data from a trust-worthy third party
beforehand, user ask the governement using its private key or SIN a copy of its personal data signed 
<ol>
  <li>SmartContract(signed encrypted personal info, bikeid)
  <ul>
  <li>if signed correctly accept encrypted data</li>
  <li>else ask for deposit</li>
  </ul>
  </li>
</ol>

***new Pros/Cons***

<pr>

***+*** Bixi can trust your personal data <br>
***-*** let's say you use RSA, how can the user be certain Bixi won't decrypt the data at the beginning? (the contract can be seen by anyone, that means Bixi as well) <br>
***-*** someone who knows your private key or that can request signed info could steal a bike with your name <br>
<pr>

### current situation : how can the smart contract receive encrypted data, reencrypt it without Bixi knowing how to decrypt it until the contract is broken ?

- possible solution : https://www.coinbureau.com/review/secret-network-scrt/
- it is said that input and output are encrypted -> encrypted to who, is it robust?




