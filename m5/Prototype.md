# Introduction

As explained in milestone 1 of this project, the renting protocols on which currently rely the most widely used micro-mobility services around the globe offer insufficient privacy guarantes. Indeed, these services have shifted over the past 15 years from low-tech unlinkable and untraceable systems to high tech systems collecting lots of personal information. Every user is now clearly identified through various lookup identifiers such as credit card information, address, email, phone number... Morover, each ride is completely traceable in time and location and is linked to the user's identity, enabling a powerful profiling of users. On top of that, data is often retained for unspecified periods of time. For all those reasons, the databases of these service providers are goldmines of user personal information, making them a single point of failure to the identity of many citizens. We chose to focus on Montreal's bike renting system BIXI and to develop a bike renting protocol that minimally affects the user's privacy without excessively degrading the new features enabled by technology.

## Our solution, PIXI

We propose an alternative to BIXI's current bike renting protocol that is incorporates the core requirements of privacy by design. From now on, we will refer to this solution as PIXI. PIXI relies a publicly accessible and unmodifiable smart contract that resides on the ethereum blockchain. Payments are made using the Ethereum, which requires the user to have a Metamask wallet in order to transfer the cryptocurrency. No personal identifiers are collected by our system, and no account is necessary. PIXI's web app consists of a locally stored map of all the stations with refreshable data showing the bikes and docks available in each station. The button "connect-wallet" enables the user to conect his metamask wallet in order to make the payments. The button "rent-bike" prompts the user to enter the ID engraved in the bike that he wants to rent. The user then has the option of paying a deposit corresponding to the price of the bike or to upload a file encrypted with PIXI's public key that contains his personal info. This file can be decrypted by PIXI only if the bike hasn't been returned within 24 hours (in which case the contract is broken and the bike considered stolen). The details of this revocable privacy protocol will be described in a later section. Once the bike is docked, the money is tranfered from the user's ethereum wallet to PIXI's wallet and the protocol is complete, leaving no records on PIXI's database except that bike nID was rented from station x at time t and docked from station y at time t' (allowing for some network analysis).

## Design decisions

### Smart contracts and Ethereum

One of PIXI's key requirements was to provide anonymous payments, in order to keep the user's identity out of the bike renting process. This was made possible by the use of a smart contract and cryptocurrency to complete the transaction. Smart contracts are self-executing digital agreements that are hard-coded on the blockchain. Once deployed, they reside on a block and are hashed on all the subsequent blocks, which makes them _unmodifiable_. This is a key property as it ensures that PIXI can never change the terms of the contract during its execution. Note that this does not mean that PIXI will never be able to update its service. Rather, it implies that if PIXI wants to change the terms of the contract for whatever reason, it will have to deploy a new contract on a different block of the Ethereum blockchain, which the user will necessarily be aware of. The security of the Ethereum blockchain also relies on its _transparency_. Concretely, all transactions and smart contracts are made public, allowing anyone to verify the data[^1]. This implies that the wallet-address of the sender, the receiver, the amount of the transaction as well as the parameters of the invocation of the smart contract (including the bikeID and the encrypted personal data) are publicly accessible. This definitely has privacy implications for the user. However, it is still much better then BIXI's current system as our PIXI can only retrieve a recognizable identifier (the wallet address) instead of a lookup identifier (credit card information). Moreover, the wallet address is not collected by PIXI (it is only available on the blockchain). The problem is that the different payments made by a user could potentially be linked. However, this is a mandatory tradeoff as no perfectly unlinkable online payment method exists to this day. Users can still achieve unlinkability by using a different wallet each time they make a payment, but this requires an extra effort from them that is not built in the system. We are aware that there exist other types of crytpocurrencies like monero that make the tracking of payments more difficult through the use of mixing services. Our proposed solution could technically work with those but they were also significantly more complex to integrate to the project, making their implementation not realistic given the timeframe.

### Metamask

As mentioned in the previous section, users need an Ethereum wallet to use PIXI. Their wallet address will be sent to the smart contract when they invoke it. In our prototype, we only support the Metamask wallets. We chose Metamask because it offers the possibility to connect the user's wallet to PIXI's web app through a browser extension, making the transaction process very simple from the user. This is an essential requirement for a system like PIXI that is destined to be used by the general public. Metamask is also convenient from the developper side as it allows us to interact directly with the Ethereum API. However, this requirement of a wallet injects a dependancy on a third party, Metamask, which comes with legitimate concerns for the user's privacy [^2]. The Metamask extension asks for 3 permissions including the access to your data for all websites: a massive tradeoff. However, all metamask does is inject the Ethereum Web3 API into the javascript context of every website in order to enable decentralized apps like PIXI to access blockchain data from within the browser. Metamask is open source, widely used, and they have never been flagged for an abusive use of these permissions. It has a single CVE instance in the National Vulnerability Database dating from 2022 with medium severity that has been fixed since. They also admit collecting the IP address of users when they initiate a transaction ("to ensure successful transaction propagation, execution, and other important service functionality such as load balancing and DDoS protection" [^3]). The IP data is stored for 7 days on a separate database from the wallet address preventing any aggregation of these information. For all these reasons, we think it is reasonable to trust Metamask even though we would have preferred that they minimized their permissions by letting the user select which domains it gives access to. To mitigate this concern, we recommend the user to download the extension on a browser that he doesn't regularly use and to reserve the utilization of this secondary browser for PIXI and any other service that they may use requiring Metamask.

Once the user has his Metamask wallet (no personal information is required to set up an account) and receives his public wallet address, he can proceed to purchasing ether. There are several ways of acquiring ether using online 3rd party platforms but we strongly recommend using an Ether ATM to pay with good old cash. That way there is no trace linking any piece of your identity to your ethereum account other than the location of the ATM. For reference, there are 10 different ether ATMs within a 2km radius of our classroom in McGill's Adams building. 

Note that PIXI's dependancy to a third party ethereum wallet like metamask is to be compared with BIXI's dependancy to banks through credit card payments. Metamask and online banking services are comparable in the sense that their use goes way beyond just PIXI or BIXI as they can be used for any other online service that requires a transaction to be made. The difference is that the bank stores a lot of your personal information whereas metamask does not store any other identifier then your wallet address even though they could potentially access some of your browsing history as mentioned earlier.

PIXI is now able to process payments and make the system function. However, one big functional requirement was the guarantee for PIXI that its bikes can't be stolen without repercussions for the thief. This can be handled in one of two ways:
- Make the user pay a deposit which is returned when the bike is returned. This is not very convenient for the user as it requires him to have a big amount of cryptocurrency in his wallet in order to make the payment.
- Use _revocable privacy_ to ensure that the user's personal information is only revealed if he steals the bike. The transparency of the smart contract complicates this process, but we have come up with a procedure that makes it work.

### MyDex and TEEs 

Trusted Execution Environments (TEEs) function like "black boxes" for data processing.

Explain metamask: how to put money, how easy, check on privacy metamask.
Ethereum is purchased from someone who's already mined it.

## Bibliography

[^1]: T. Chen et al., "Understanding Ethereum via Graph Analysis," IEEE INFOCOM 2018 - IEEE Conference on Computer Communications, Honolulu, HI, USA, 2018, pp. 1484-1492, doi: 10.1109/INFOCOM.2018.8486401. keywords: {Conferences},

[^2]: D. Pramulia and B. Anggorojati, "Implementation and evaluation of blockchain based e-voting system with Ethereum and Metamask," 2020 International Conference on Informatics, Multimedia, Cyber and Information System (ICIMCIS), Jakarta, Indonesia, 2020, pp. 18-23, doi: 10.1109/ICIMCIS51567.2020.9354310. keywords: {Performance evaluation;Multimedia systems;Reverse engineering;Blockchain;Reliability;Security;Electronic voting;Electronic voting;blockchain;smart contract;Ethereum},

[^3]: https://consensys.io/blog/consensys-data-retention-update,





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




