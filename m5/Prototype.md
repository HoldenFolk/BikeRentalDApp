# Introduction

Our solution relies on the blockchain to implement an unlinkable payment. The smart contract works as an interface between the user and BIXI. It collects the user's payment in a totally anonymous way and deposits it to BIXI in exchange for the freeing of the bike.

Testing a commit

# blockchain

- so far, we plan on using smart contracts the following way : 
1) SmartContract(deposit, bikeid) // creates smartcontract given the deposit and bikeid
2) the smart contract ask bixi to unlock the bike, then start a timer
3) bikeReturned(bikeid, timer) // calculates the fees
4) user_receives(fees) // user receives deposit - fees, bixi receives fees
5) timer_expired(bikeid) // send notif to bixi, bixi receives the deposit money
Pros/Cons
+ bixi does not know any personal info
+ users are protected by bixi's reputation
- users are not protected if bixi has malicous intent (don't finish contract when bike is returned)
- users can be tracked by public wallet address (linkability of trips)
- large deposit, not cheap

- using privacy coins:
+ users arte not unlinkable on the blockchain, i.e there trip history cannot be retrieved

- alternative involving revocable privacy potential strategy:
1) SmartContract(personal info, bikeid)
2) the smart contract ask bixi to unlock the bike, then start a timer
3) bikeReturned(bikeid, timer) // calculates the fees
4) user_receives(fees) // user's info stay encrypted, bixi receives fees
5) timer_expired(bikeid) // send notif to bixi, bixi receives the personal info and tries to rreach you
Pros/Cons
+ no deposit, cheaper
+ althought the fees are calculated by Bixi, user can put a limit to their wallet
+ users can't be tracked (privacy coins scenario)
- how can the company trust the personal data ?
- external user can see personal data (transaction is public on blockchain)

- alternative of encrypting personal data
1) SmartContract(encrypted personal info, bikeid)
2) the smart contract ask bixi to unlock the bike, then start a timer
3) bikeReturned(bikeid, timer) // calculates the fees
4) user_receives(fees) // user's info stay encrypted, bixi receives fees
5) timer_expired(bikeid) // send notif to bixi, bixi decrypts the personal info and tries to reach you
new Pros/Cons
+ external user can't see the personal data since the data is encrypted
- how can the company trust the personal data ?
- let's day you use RSA, how can the user be certain Bixi won't decrypt the data at the beginning?

- alternative signed encrypted personal data from a trust-worthy third party
beforehand, user ask the governement using its private key or SIN a copy of its personal data signed 
1) SmartContract(signed encrypted personal info, bikeid) 
- if signed correctly accept encrypted data
- else ask for deposit
new Pros/Cons
+ Bixi can trust your perosnal data
- let's day you use RSA, how can the user be certain Bixi won't decrypt the data at the beginning?
- someone who knows your private key or that can request signed info could steal a bike with your name

- current situation : how can the smart contract receive encrypted data, reencrypt it without Bixi knowing how to decrypt it until the contract is broken ?




