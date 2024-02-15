# Mobility apps and privacy, a case study on the BIXI app


## Introduction  

Large-scale bike sharing services have a short but dense history, shaped by the successive technological revolutions of the past 30 years. It began in Copenhagen in 1995 with the launching of Bycyklen. The system was very straightforward: multiple bike racks were layed out accross the city. Users could unlock a bike by inserting a coin. They could later recover their coin by rechaining their bike at any other station (similarly to how shopping carts are retrieved in supermarkets). This system was completely anonymous and untraceable, ten out of ten in terms of privacy.

  

In 2009, BIXI was launched using a totally different system: docking stations were electronized. This system is much more privacy invasive as each ride's data (start and finish time and location) is stored in databases for analysis. Regular users could subscribe to a membership and receive a magnetic card/key which they would use to unlock bikes. They must give in their name, adress, phone number and email to register. One time users must pay by credit card at the stations. In either case, BIXI's databases contained enough information to profile each user's riding habits and link it with their personal data. Note that one time users preserve relative anonymity (unless someone crosses BIXI's database with their credit card provider's database). This profiling of users is a goldmine of personal information.

  

In 2013, BIXI introduced a new feature to their service: the Mobile app. This allows for users to see the availability of nearby stations in real time among other features. But these new features bring additional privacy concerns: BIXI now has access to the live location of all active users, allowing them to derive live information such as speed and precise itinerary of each trip. We will dwelve deeper into the privacy implications of this new layer of data added to BIXI's databases in the rest of this report. Both systems were concurrent until 2021, when BIXI removed the magnetic card service for regular users. To this day, it forces them to use the app. One-time purchases are also facilitated through the app, making it even more unavoidable.
  

## Research Method

A privacy assessment was conducted on Bixi to determine the most critical threats and concerns that face the technology. Three research questions were asked to help organize the main areas of interest in the topic. 

I read the privacy policies of BIXI, LIME, BIRD CANADA, and Citi Bike. I compared the policies with PIPEDA and GDPR since most of the companies are providing services in Canada and Europe. I did some research on legal cases where ride-sharing services were involved. I searched for research papers on the implications of the data that the companies collect.

To what extent is the technology that Bixi is using a concern for the user's privacy? The objective of this question was to investigate any privacy concerns and data collection processes that could be found within the underlying technology of the Bixi application. The methodology used to answer this involved analysis of the Bixi mobile application's HTTP requests through a proxy server. This section outlines the procedures followed to collect the data.

A proxy server intercepted the HTTP requests sent from the mobile application to Bixi’s API. This required using a proxy application, such as Postman, to create the proxy. A mobile phone installed with the Bixi application was configured to route its traffic through the proxy server. With the proxy server and mobile phone configured, the Bixi application was run on the mobile device and used as usual to conduct a trip. This step allowed the proxy to capture the real-time data sent to and from the Bixi API throughout the usage. The captured requests were then analyzed to understand the structure of the API calls, the data within them, and the endpoints involved.

New York’s bike-sharing service, Citi Bike, was also analyzed to provide further data. Given that Citi Bike shares the same parent company and, consequently, the same technology as Bixi, this application was analyzed to draw Parallels to Bixi


- Are there any studies or research done into the privacy implications of this technology

The overall technology of online bike sharing services was researched. Studies that talked about the privacy implications of this technology were the keypoint of this research. Finally, the data these companies collect and what they do with it was researched as well.

## Results


The policies of BIXI, LIME, BIRD CANADA, and Citi Bike were very general. It was difficult to find proper documentation on the delimitations they have in place to minimize the collection and use of personal data. They justify their collection by stating that they provide a service and need to improve it. However, the service is not clearly defined, and neither are their data retention policies, other than keeping data as long as it fulfills the purpose for which it was collected, generally to improve or provide the service. Similarly, the safeguards used to guarantee proper protection of the data are described as 'secure', but the level of security is not clearly specified.

Data analysis of the API clarified the underlying privacy concerns around the Bixi technology. Of the data collected, three areas of interest were logging personal identifiers, logging trip information, and data aggregation.
  

The first interest data was returned from a response to the Bixi account information endpoint. This endpoint is called at the start of every user session and delivers sensitive user data to the mobile application. Various personal identifiers can be found within the response, showing the extent of the information Bixi keeps stored for each user. The complete list of identifiers can be seen in [figure 3.](#appendix). Even more concerning is that Bixi stores the credit card expiration date, which violates their privacy policy. ([See figure 1.](#appendix))
  

A second cause for concern was found in the HTTP request made after a trip had been finished. This request, also made to the Bixi private API, is sent after docking your bike at a station. The information in the response body included trip statistics, geo-location data of the docking stations, and time stamps. All this information is directly linked with a unique identifier that Bixi uses to associate the information with the user. Aggregating this data could infer a user's daily routine and even more subtle information, such as physical ability. The complete response can be found in [figure 2.](#appendix)

  

Investigating and comparing similar bike-sharing services to Bixi also proved insightful. Bixi’s parent company, Public Bike Sharing Co., owns New York’s bike-sharing service, Citi Bike. Citi Bike uses the same software and API as Bixi and provides further information into the privacy concerns of the technology. A concerning API endpoint was found when logging HTTP requests from the Citi Bike application. This endpoint returned a list of identifiers for the user's favorite docking stations in the city. While not directly related to Bixi, the “favorite stations” endpoint proves that Bublic Bike Sharing Co. has the ability to aggregate trip data to gain insights on a user. These insights only come from the data visible to the user; however, one can imagine what else the data is used for behind the scenes.

In the case of BIXI, their privacy policy states that a user can limit the collection of personal data, but doing so would reduce the features the user has access to. However, this claim is questionable as some services are closed off even when the data they require is unnecessary for their operation. Moreover, some of these companies share data with third parties known for their questionable privacy policies, such as Meta and Google.

Unfortunately, there are not many papers talking about the implications and what BIXI could possibly do with all of the data they collect. But, we can assume that they build machine learnig model to predict a user movements using previous trips. Also, they could propably estimate your physical conditions and use it to profile you.

  

When it comes to online bike sharing services, they collect a fair amount of their users' personal information. In general, they collect the information and then they publish the dataset after removing each and every user's identity. However, an ill intent individual could, with some research, link this information to a user and therefore breach the user's privacy. There was a solution that was explained in detail in a chinese study: [An Effective Grouping Method for Privacy-Preserving Bike Sharing Data Publishing](https://www.mdpi.com/1999-5903/9/4/65). This group of researchers suggested a grouping-based anonymization that would help protect the privacy of the users by making it a lot harder or even impossible for an adversary to link the personal information to an individual. This technique is a good balanced solution that protects the privacy of the users while maximizing the data utility, as it utilizes the data more efficiently for analysis purposes compared to other anonymization techniques.

  

Bixi is an online bike sharing service that uses docks, however, in the near future it could become dockless. Lime, which is a transportation company that runs electric bikes all around the world based in San Francisco, California, is able to map your movement because of its bikes. Indeed, since they are built to operate without stations, the bikes transmit their location every few seconds, thus Lime knows where a ride starts and ends, and the whole route of the bike during the ride. This comes with its fair share of privacy implications. If a leak were to happen, adversaries could track people precisely, they could know where the users live, where they work, their habits, and many more private information. However, even if Bixi is not dockless, the same privacy threats apply. Bixi stores a user's start location and their end location. They also store the bike's location in real time. Therefore, an ill intent individual could in theory hack Bixi to obtain a user's habits, which could easily lead to a planned attack on a user that takes a specific route every morning. This means that even if Bixi does not sell or use our data for greedy purposes, the threats are still very present and prominent.

  

Not many papers talk about BIXI specifically, but it can be said that they have the ability collect all the information that Lime and any other bike sharing company collect. It can be said that even if the company's privacy policy states that they are not using their users' data or selling it to third parties, the threat of ill intent individuals is always there as we live in a society where there will always be people trying to take advantage of others. Additionally, any government agencies, with a warrant, could ask Bixi to give them real time data about their users' geolocation or any other information according to Bixi's privacy policy.    

## Conclusion

At first glance, one could argue that these ride-sharing companies are compliant with regulations such as PIPEDA and GDPR. However, as shown before, they lack openness and transparency with their users. This lack of transparency poses a serious threat to customer privacy as users are asked to consent to vaguely defined policies. This is concerning because these companies make it seem like users consent to all activities, but in reality, users don't know what these companies are actually doing with their data.

It's a recurring theme for these companies to justify their actions by claiming to improve their services. However, the service provided by each of these companies changes over time, making it almost impossible to argue that old data was not collected for the new service. This poses a threat of secondary use, and without enforcing proper delimitations in the privacy policies, this threat won't cease.

Now that we discussed the extensive data use and retention practices of these companies, it's crucial to explore the profound implications of such practices. Just by analyzing the data collected in accordance with their privacy policies, it becomes evident that even in the absence of your name, these companies could effortlessly identify you using publicly available information. Moreover, they possess the capability to construct detailed profiles based on trip data, potentially exposing sensitive aspects of your physical condition.

Furthermore, by leveraging real-time data, these companies could easily ascertain whether you are at home or not, thereby encroaching upon your privacy and engaging in unwarranted surveillance. This intrusion into personal space raises significant concerns regarding individual autonomy and the right to privacy.

When it comes to the data they collect, it might be deemed all necessary. Indeed, they do need to track the start point, the end point and the entire route in case of any accidents or even theft. However, they do not need to keep this information after the ride is complete, and it was confirmed to be a trip with no complications. This aggregation of data brings a huge threat of privacy breach which is in itself not necessary for the service. If these companies publish their dataset, the implementation of robust anonymization techniques and adherence to rigid privacy policies are crucial to protecting the privacy of their user. Additionally, users should be clearly informed about the potential threats of using an online bike sharing service, and also warned about exercising caution when sharing sensitive information online.


## Appendix:

- Reference 1.
"When you purchase a subscription through the App, our online payment providers collect certain personal information such as payment data (for example, the number, CVV code and expiration date of the payment card). BIXI does not have access to this information, which is encrypted and used by the online payment providers in compliance with PCI-DSS standards. Information thus collected is kept on servers that may be located outside Canada, particularly in the United States."
(Terms and conditions of the BIXI mobile app, 2023)

- Reference 2.
API Response From Bixi Endpoint: 'https://layer.bicyclesharing.net/mobile/v1/mtl/rental/closed?memberId='
```json
{
    "dataWarehouseAvailable": true,
    "rentals": {
        "REDACTED": [
            {
                "distanceInMeters": 367,
                "co": 0,
                "distanceCalculation": "AVERAGE_SPEED",
                "ti": true,
                "endLocation": [
                    -73.57589408755302,
                    45.50277615861811
                ],
                "startLocation": [
                    -73.57589408755302,
                    45.50277615861811
                ],
                "rentalId": "f252782e-b1b0-4420-a9f0-123c28d95621",
                "rentalAccessMethod": "QR_CODE_MOBILE",
                "sd": 1707421801872,
                "ss": "McTavish / Sherbrooke",
                "ed": 1707421912077,
                "es": "McTavish / Sherbrooke",
                "electricPedalAssist": false,
                "bike": {
                    "displayedNumber": "B03960"
                }
            }
        ]
    }
}
```

- Reference 3. 
API Response From Bixi Enpoint: 'https://layer.bicyclesharing.net/mobile/v1/mtl/account'
```json
{
    "status": "o",
    "taxRegion": {
        "code": "CA",
        "name": "Canada"
    },
    "billing": {
        "address": {
            "postalCode": "REDACTED"
        },
        "creditCard": {
            "holderName": "Holden Folk",
            "number": "450003****** REDACTED",
            "expirationMonth": REDACTED,
            "expirationYear": REDACTED,
            "numberDeleted": false,
            "mandatoryUpdateOnNextSubscriptionPurchase": false,
            "creditCardConfirmed": true,
            "expired": false,
            "cardBrand": "REDACTED"
        }
    },
    "member": {
        "id": "REDACTED",
        "firstName": "Holden",
        "lastName": "Folk",
        "language": "fr",
        "birthday": {
            "day": 10,
            "month": 12,
            "year": 2002
        },
        "gender": "m",
        "email": "REDACTED",
        "emailCorrespondence": false,
        "type": "h",
        "phoneNumber": "REDACTED",
        "shippingAddress": {
            "houseNumber": "REDACTED",
            "street": "REDACTED",
            "city": "REDACTED",
            "country": "CA",
            "countryRegion": "QC",
            "postalCode": "REDACTED",
            "apartment": "REDACTED"
        },
        "memberSinceMs": 1635045035016,
        "termsAndConditionsAcceptanceDateMs": 1635045033984,
        "currentSubscription": {
            "id": "9142685",
            "type": {
                "id": "161",
                "name": "One-Way Pass",
                "minimumDelayBetweenRentalsMs": 0,
                "configuration": {
                    "paymentStrategy": "o"
                }
            },
            "status": "e",
            "numberOfConcurrentBikes": 1,
            "startDateMs": 1707323840201,
            "endDateMs": 1707324740201,
            "corporateEmailConfirmed": "n"
        },
        "needsFirstKey": true,
        "allowedAccessMethods": [
            "CREDIT_CARD",
            "BIKE_KEY",
            "MOBILE"
        ],
        "partial": false,
        "rideInsightsEnabled": false,
        "hasAcceptedTermsAndConditions": true,
        "canPurchaseSubscription": true,
        "hasPassword": true
    },
    "entitlements": {
        "mobileUnlock": false,
        "hiddenFeatures": false,
        "skipCheckLogin": false
    }
}
```

- Reference 4.
API Response From Citi Bike Enpoint: 'https://layer.bicyclesharing.net/v2/nyc/favoritestation'
```json
{
    "ids": [
        "123",
        ...
    ]
}
```

- https://montrealgazette.com/news/local-news/managing-the-bixi-maze-a-day-in-the-life-of-montreals-bike-sharing-service-part-i

- [Lime Company](https://www.technologyreview.com/2018/09/28/139983/the-secret-data-collected-by-dockless-bikes-is-helping-cities-map-your-movement/)
- [The Privacy Concerns’ Influences on Bike-Sharing Consumers’ Behavior](https://www.aasmr.org/jsms/Vol12/JSMS%20April%202022/Vol.12No.02.12.pdf)
- [What do trip data reveal about bike-sharing system users?](https://www.sciencedirect.com/science/article/pii/S0966692321000247)

