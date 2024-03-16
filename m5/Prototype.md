# Introduction

Our solution relies on the blockchain to implement an unlinkable payment. The smart contract works as an interface between the user and BIXI. It collects the user's payment in a totally anonymous way and deposits it to BIXI in exchange for the freeing of the bike.

Testing a commit

# blockchain

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




