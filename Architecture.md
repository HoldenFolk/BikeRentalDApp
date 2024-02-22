## Old System Purpose and Scope

### User Registration
    -   track user trips
    -   personal data collect : name, email, phone number, address
    -   certificate to prove age

### Bike Rental
    -   track every bike/trips
    -   prevent theft/accident
    -   data collected : average speed, distance, start location, end location, rental id

### Station Management
    -   track how many bikes per Station
    -   data : location, ids of all bike

## New System

### User Registration
    -   outside database that keep personal information associated with an id
    -   every time personal information is access, it is logged
    -   personal data collected : name, email, birthdate

### Bike Rental
    -   artificial id for every trip and artificial id for user
    -   2 hours delay from when the data is collected until it is saved in the database
    -   
