# Introduction

As explained in milestone 1 of this project, the renting protocols on which currently rely the most widely used micro-mobility services around the globe offer insufficient privacy guarantes. Indeed, these services have shifted over the past 15 years from low-tech unlinkable and untraceable systems to high tech systems collecting lots of personal information. Every user is now clearly identified through various lookup identifiers such as credit card information, address, email, phone number... Morover, each ride is completely traceable in time and location and is linked to the user's identity, enabling a powerful profiling of users. On top of that, data is often retained for unspecified periods of time. For all those reasons, the databases of these service providers are goldmines of user personal information, making them a single point of failure to the identity of many citizens. We chose to focus on Montreal's bike renting system BIXI and to develop a bike renting protocol that minimally affects the user's privacy without excessively degrading the new features enabled by technology.

## Our solution, PIXI

We propose an alternative to BIXI's current bike renting protocol that is incorporates the core requirements of privacy by design. From now on, we will refer to this solution as PIXI. PIXI relies a publicly accessible and unmodifiable smart contract that resides on the ethereum blockchain. Payments are made using the Ethereum, which requires the user to have a Metamask wallet in order to transfer the cryptocurrency. No personal identifiers are collected by our system, and no account is necessary. PIXI's web app consists of a locally stored map of all the stations with refreshable data showing the bikes and docks available in each station. The button "connect-wallet" enables the user to conect his metamask wallet address in order to make the payments. The button "rent-bike" prompts the user to enter the ID engraved in the bike that he wants to rent. The user then has the option of paying a deposit corresponding to the price of the bike or to upload a file encrypted with PIXI's public key that contains his personal info. This file can only be decrypted by PIXI if the bike hasn't been returned within 24 hours (in which case the contract is broken and the bike considered stolen). The details of this revocable privacy protocol will be described in a later section. Once the bike is docked, the money is tranfered from the user's ethereum wallet to PIXI's wallet and the protocol is complete, leaving no records on PIXI's database except that bike nID was rented from station x at time t and docked from station y at time t' (allowing for some network analysis).

## Design decisions

### Smart contracts and Ethereum

One of PIXI's key requirements was to provide anonymous payments, in order to keep the user's identity out of the bike renting process. This was made possible by the use of a smart contract to complete the transaction. Smart contracts are self-executing digital agreements that are hard-coded on the blockchain. Once deployed, they reside on a block and are hashed on all the subsequent blocks, which makes them _unmodifiable_. This is a key property as it ensures that PIXI can never change the terms of the contract during its execution. Note that this does not mean that PIXI will never be able to update its service. Rather, it implies that if PIXI wants to change the terms of the contract for whatever reason, it will have to deploy a new contract on a different block of the Ethereum blockchain, which the user will necessarily be aware of. The security of the Ethereum blockchain also relies on its _transparency_. Concretely, all transactions and smart contracts are made public, allowing anyone to verify the data. This implies that the wallet-address of the sender, the receiver, the amount of the transaction as well as the parameters of the invocation of the smart contract (including the bikeID and the encrypted personal data) are publicly accessible. This definitely has privacy implications for the user. However, it is still much better then BIXI's current system as our PIXI can only retrieve a recognizable identifier (the wallet address) instead of a lookup identifier (credit card information). Moreover, the wallet address is never sent to PIXI (it is only available on the blockchain). The problem is that the different payments made by a user could potentially be linked. However, this is a mandatory tradeoff as no perfectly unlinkable online payment method exists to this day. Users can still achieve unlinkability by using a different wallet each time they make a payment, but this requires an extra effort from them that is not built in the system. We are aware that there exist other types of blockchain that make the tracking of payments more difficult, but these were also significantly more complex to integrate to the project, making them not realistic given timeframe.

### Metamask

As mentioned in the previous section, users need an Ethereum wallet to use PIXI. Their wallet address will be sent to the smart contract when they invoke it. In our prototype, we only support the metamask browser extension. We chose it because it 


Explain metamask: how to put money, how easy, check on privacy metamask.
Ethereum is purchased from someone who's already mined it.

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




