# Functional Requirements

## User Registration : 
    -   Users can make as many account as they want, but they will have to register there billing information every time
    -   No personal information is required to create an account except for billing info (no email, name, )
    -   Age can ve verified with a electronic certificate
## User Authentification : 
    -   Users can log into their account using a combination of username and password
    -   Users have the option to enable 2FA-Authentification
## Bike
    -   bikes should be docked 
    -   the only way the bike can be undocked is using a smart contract
    -   it should be easy to create a smart contract with a certain bike
    -   the bike should have a way to measure usage fees for the smart contract (oracles?)
    -   the bike issues a session id to the user for a period of 24h
## Blockchain Network
    -   make sure the blockchain network is secure
    -   make sure it can run in an appropriate amount of time
    -   we chose ethereum
## Smart Contract
    -   make the contracts detailed and not overly complicated 
    -   make the contracts fast and easy for Users
    -   make the contracts robust (what if a bike is not docked properly)
    -   make contracts easily accessable to owner (see state of the trip)
    -   log every trip with its session id
## Payment
    -   payment is manage by the smart contract
    -   there should be a second policy regarding the case of unexpected scenarios


# Privacy Requirements

## Data Minimization
    -   the personal information collected is billing info
    -   a session id is associated to the user for a period of 24h in case a problem arises

## Identification / Anonymization
    -   it sould be impossible for anyone to identify a user looking at the trip Data
    -   there is a risk of identification using the session id but the session id is deleted after 24h (!!) check if this makes sense

## Data Retention
    -   since no identifiers or quasi identifiers are collected on the trips then all the trip data is preserved
    -    




