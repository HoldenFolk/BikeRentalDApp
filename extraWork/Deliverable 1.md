# Mobility apps and privacy, a case study on the BIXI app


## Introduction


Large-scale bike-sharing services have a short but dense history, shaped by the successive technological revolutions of the past 30 years. It began in Copenhagen in 1995 with the launching of Bycyklen. The system was straightforward: multiple bike racks were laid out across the city. Users could unlock a bike by inserting a coin. They could later recover their coin by chaining their bike at any other station (similarly to how shopping carts are retrieved in supermarkets) (Shaheen & Cohen, 2022). This system was completely anonymous and untraceable, ten out of ten in terms of privacy.
 


In 2009, BIXI was launched using a different system: docking stations were electronized. This system is much more privacy-invasive as each ride's data (start and finish time and location) is stored in databases for analysis. Regular users could subscribe to a membership and receive a magnetic card/key, which they would use to unlock bikes. They must provide their name, address, phone number, and email to register. One-time users must pay by credit card at the stations. In either case, BIXI's databases contain enough information to profile each user's riding habits and link them with their personal data. Note that one-time users preserve relative anonymity (unless someone crosses BIXI's database with their credit card provider's database).
 


In 2013, BIXI introduced a new feature to their service: the Mobile app. This major technological transition,  among other features, allows users to see nearby stations' availability in real-time (Bruemmer, 2013). However, it also brings additional privacy concerns: BIXI now has access to the live location of all active users, allowing them to derive live information such as speed and precise itinerary of each trip. 


Both systems (app and magnetic key) were concurrent until 2021 when BIXI decided to remove the magnetic key service for regular users. To this day, it forces them to use the app. One-time purchases are also facilitated through the mobile app, making it even more unavoidable. This report will shed light on the privacy implications of this transition to a mobile app-based service. It will focus on showing the extent of the data collected by BIXI and some similar bike-sharing companies like Citi Bike, Lime, and Bird.
 


## Research Method


A privacy assessment was conducted on BIXI to determine the most critical threats and concerns induced by the technology. Three research questions were asked to help organize the main areas of interest in the topic.


Does BIXI follow privacy regulations?
The investigation into this question involved examining the privacy policies of BIXI, LIME, BIRD CANADA, and Citi Bike. These policies were compared against the regulations outlined in GDPR and Quebec's Law 25, as they operate in Quebec and Europe. Additionally, legal cases involving ride-sharing services were analyzed, and research papers from Google Scholar discussing the implications of the data collected by these companies were reviewed.


To what extent is the technology that BIXI is using concering for the user's privacy? The objective of this question was to investigate any privacy concerns and data collection processes that could be found within the underlying technology of the BIXI application. The methodology used to answer this involved analysis of the BIXI mobile application's HTTP requests through a proxy server. This section outlines the procedures followed to collect the data.


A proxy server intercepted the HTTP requests sent from the mobile application to BIXI's API. This required using a proxy application, such as Postman, to create the proxy. A mobile phone installed with the Bixi application was configured to route its traffic through the proxy server. With the proxy server and mobile phone configured, the BIXI application was run on the mobile device and used as usual to conduct a trip. This step allowed the proxy to capture the real-time data sent to and from the BIXI API throughout the usage. The captured requests were then analyzed to understand the structure of the API calls, the data within them, and the endpoints involved.


New York's bike-sharing service, Citi Bike, was also analyzed to provide further data. Given that Citi Bike shares the same parent company and, consequently, the same technology as Bixi, this application was analyzed to draw Parallels to Bixi.


Finally, a thorough research of the scientific literature on the privacy implications of mobile app-based bike-sharing services was conducted.






## Results




The privacy policies of BIXI, LIME, BIRD CANADA, and Citi Bike exhibit similar deficiencies in transparency. While they all mention collecting personal information for various purposes, such as providing the service, managing accounts, and preventing theft, none fully disclose how the information is collected, the consequences for users, or their rights of access and correction. Furthermore, across these policies, there is a lack of clarity regarding the retention period of personal information and the measures taken to ensure its protection, which contravene Article 65 of Quebec's Law 25 [Appendix A](#appendix) and with GDPR's Lawfulness, Fairness and Transparency principle [Appendix B](#appendix). Therefore, it is impossible to conclude whether they comply with Article 73 of Quebec's Law 25 [Appendix C](#appendix). While they all mention implementing security measures, they must provide detailed information about them. 


Regarding research, there is not much out there discussing the risks of collecting users' geolocation data, and the few papers available are not directly related to BIXI's situation. On the legal front, there has been a lawsuit in Los Angeles where someone sued the government over what they see as overly intrusive governmental surveillance through electric scooter companies.


Next, Data analysis of the API clarified the underlying privacy concerns around the Bixi technology. Of the data collected, three areas of interest were logging personal identifiers, logging trip information, and data aggregation.
 


The first interest data was returned from a response to the Bixi account information endpoint. This endpoint is called at the start of every user session and delivers sensitive user data to the mobile application. Various personal identifiers can be found within the response, showing the extent of the information Bixi keeps stored for each user. The complete list of identifiers can be seen in [Appendix D.](#appendix). Even more concerning is that Bixi stores the credit card expiration date, which violates their privacy policy. ([See Appendix E.](#appendix))


A second cause for concern was found in the HTTP request made after a trip had been finished. This request, also made to the Bixi private API, is sent after docking a bike at a station. The information in the response body included trip statistics, geolocation data of the docking stations, and time stamps. All this information is directly linked with a unique identifier that Bixi uses to associate the information with the user. Aggregating this data could infer a user's daily routine and even more subtle information, such as physical ability. The complete response can be found in [Appendix F.](#appendix)


Investigating and comparing similar bike-sharing services to Bixi also proved insightful. Bixi's parent company, Public Bike Sharing Co., owns New York's bike-sharing service, Citi Bike. Citi Bike uses the same software and API as Bixi and provides further information into the privacy concerns of the technology. A concerning API endpoint was found when logging HTTP requests from the Citi Bike application. This endpoint returned a list of identifiers for the user's favorite docking stations in the city. ([See Appendix G.](#appendix)) While not directly related to Bixi, the "favorite stations" endpoint proves that Public Bike Sharing Co. can aggregate trip data to gain insights on a user. 


BIXI's privacy policy states that a user can limit the collection of personal data but that doing so would reduce the features the user has access to. We exchanged emails with BIXI's privacy officer (appendix H), who told us that suppressing our trip history would lead to deleting our account and all other accounts using the same credit card. This policy must be revised, as past trip data should not be required to launch a new ride with the app. 


Unfortunately, there is little information about the internal use of the data collected by BIXI. However, we can assume they build machine learning models to predict a user's future movements using their trip history. Bixi could also easily estimate the users' physical condition and further profile users.


The analysis of the datasets published by BIXI revealed that the data they publish is fully anonymized. It contains only the start-time, end-time, start-location, and end-location of every trip, without any other information that could facilitate identifying specific users.
  


## Conclusion


This investigation into the privacy implications of Bixi's technology has uncovered significant privacy concerns that warrant immediate attention. Using an organized approach to data collection and research, multiple areas of privacy violation that are not detectable to the average user were identified. 


At first glance, ride-sharing companies appear compliant with regulations such as Quebec's Law 25 and GDPR. However, after closer examination, they need more openness and transparency with their users. This lack of transparency seriously threatens customer privacy as users are asked to consent to vaguely defined policies. This is concerning because these companies make it seem like users consent to all activities, but users need to know what these companies are doing with their data. It is a recurring theme for these companies to justify their actions by claiming to improve their services. However, these companies' services change over time, making it almost impossible to argue that old data was not collected for the new service. This poses a threat of secondary use, and without enforcing proper delimitations in the privacy policies, this threat won't cease. 


Analyzing the data gathered from the API collection revealed that Bixi collects a concerning amount of personal data. The discovery that sensitive data, such as credit card expiration dates, are stored while potentially violating Bixi's privacy policy shows a lack of attention to users' privacy. Furthermore, the detailed logging of trip information, including geolocation data and trip statistics, opens up the possibility of invasive user profiling and data aggregation. By leveraging real-time data, these companies could quickly ascertain whether someone is at home, encroaching upon their user's privacy and engaging in unwarranted surveillance. This was the concern of the victim of the lawsuit in Los Angeles. Even though the case has been dismissed, these intrusions into personal space raise significant concerns regarding individual autonomy and the right to privacy.


While Bixi may need to track the geolocation data of a tip to prevent bike theft, this information does not need to be stored after a trip is confirmed complete. Furthermore, using the API analysis of Citi Bike, it is indisputable that Public Bike Sharing Co. can aggregate and provide insights into user data. The aggregation seen only comes from the data visible to the user; however, one can imagine what other aggregation and profiling is done behind the scenes. 


The analysis of Bixi's public dataset showed good practice; however, it is essential to emphasize that implementing robust anonymization techniques and adherence to rigid privacy policies are crucial to protecting the privacy of all bike-sharing services' users. Additionally, users should be informed about the potential threats of using an online bike-sharing service and warned about exercising caution when sharing sensitive information online.


Given the sensitivity of the data BIXI holds on its users, the security of their databases is vital, as any leak could have severe consequences on the security of users. Additionally, with a warrant, any government agencies could ask Bixi to give them real-time data about their users' geolocation to track them.


Bixi uses docking stations. However, it is important to mention another recent technological mutation impacting the bike sharing industry: dockless bicycles. The Californian company Lime is a pioneer in dockless bike sharing services worldwide. Their bikes are built to operate without stations and transmit their location every few seconds. Similarly to  BIXI with their app, Lime has access to each ride’s data and can easily profile users and predict their next moves (Lime, 2024). The difference comes with the fact that, as there are no more fixed stations, users can drop off their bike directly at their destination. This gives Lime access to even more precise data, further putting the user’s privacy at risk in case the data is exposed, whether that be by a leak, a warrant, or any other reason.




After analysis, BIXI's service would benefit in reliability if the system was built with the user's privacy in mind. We will develop such a system respecting the principles of privacy by design.






## Appendix:


- Appendix A : Quebec’s Law 25, Article 65
“Anyone who collects personal information from the person concerned on behalf of a public body must, when the information is collected and subsequently on request, inform that person (1) of the name of the public body on whose behalf the information is collected; (2) of the purposes for which the information is collected; (3) of the means by which the information is collected; (4) of whether the request is mandatory or optional; (5) of the consequences for the person concerned or for the third person, as the case may be, for refusing to reply to the request or, if applicable, for withdrawing consent to the release or use of the information collected pursuant to an optional request; and (6) of the rights of access and correction provided by law. If applicable, the person concerned is informed of the name of the third person collecting the information on behalf of the public body, the name of the third persons or categories of third persons to whom it is necessary to release the information for the purposes referred to in subparagraph 2 of the first paragraph, and the possibility that the information could be released outside Québec. On request, the person concerned is also informed of the personal information collected from him, the categories of persons who have access to the information within the public body, the duration of the period of time the information will be kept, and the contact information of the person in charge of the protection of personal information. If personal information is collected from a third person, the person collecting it must give the third person the information referred to in subparagraphs 1, 5 and 6 of the first paragraph. Notwithstanding the foregoing, a person duly authorized by a public body which holds files respecting the adoption of persons and collects information relating to the antecedents of a person referred to in any of such files or permitting to locate a parent or an adopted person is not required to inform the person concerned or the third person of the use to which the information will be put nor the categories of persons who will have access to it. This section does not apply to judicial inquiries or to any investigation or report made by a person or body responsible by law for the prevention, detection or repression of crime or statutory offences.”
(https://www.legisquebec.gouv.qc.ca/en/pdf/cs/A-2.1.pdf)


- Appendix B : GDPR’s Lawfulness, Fairness And Transparency Principle
“Any processing of personal data should be lawful and fair. It should be transparent to individuals that personal data concerning them are collected, used, consulted, or otherwise processed and to what extent the personal data are or will be processed. The principle of transparency requires that any information and communication relating to the processing of those personal data be easily accessible and easy to understand, and that clear and plain language be used.”
(https://www.dataprotection.ie/en/individuals/data-protection-basics/principles-data-protection#:~:text=Lawfulness%2C%20fairness%2C%20and%20transparency%3A,are%20or%20will%20be%20processed.)


- Appendix C : Quebec’s Law 25, Article 73
“When the purposes for which personal information was collected or used have been achieved, the public body must destroy the information, or anonymize it to use it for public interest purposes, subject to the Archives Act (chapter A-21.1) or the Professional Code (chapter C-26). For the purposes of this Act, information concerning a natural person is anonymized if it is, at all times, reasonably foreseeable in the circumstances that it irreversibly no longer allows the person to be identified directly or indirectly. Information anonymized under this Act must be anonymized according to generally accepted best practices and according to the criteria and terms determined by regulation.”
(https://www.legisquebec.gouv.qc.ca/en/pdf/cs/A-2.1.pdf)




- Appendix D: Bixi Privacy Policy
"When you purchase a subscription through the App, our online payment providers collect certain personal information such as payment data (for example, the number, CVV code and expiration date of the payment card). BIXI does not have access to this information, which is encrypted and used by the online payment providers in compliance with PCI-DSS standards. Information thus collected is kept on servers that may be located outside Canada, particularly in the United States."
(Terms and conditions of the BIXI mobile app, 2023)


- Appendix E: API Response From Bixi Endpoint Trip Data 'https://layer.bicyclesharing.net/mobile/v1/mtl/rental/closed?memberId='
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




- Appendix F: API Response From Bixi Enpoint Account Data 'https://layer.bicyclesharing.net/mobile/v1/mtl/account'
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


- Appendix G: API Response From Citi Bike Enpoint: 'https://layer.bicyclesharing.net/v2/nyc/favoritestation'
```json
{
    "ids": [
        "123",
        ...
    ]
}
```
- Appendix H : Email conversation with BIXI’s privacy officer:
---


**From:** Pablo Collin  
**Sent:** February 12, 2024, 14:00  
**To:** BIXI Montréal <info@bixi.com>  


Bonjour Eva,


Merci pour votre réponse détaillée. Je souhaite continuer à utiliser BIXI alors n’annulez pas mon compte.


Y a-t-il un moyen de continuer à accéder au service tout en m’assurant que l’historique de mes déplacements ne soit pas conservé ?


Bien à vous,


Pablo Collin


---


**From:** BIXI Montréal <info@bixi.com>  
**Sent:** February 12, 2024, 14:00  
**To:** Pablo Collin  
**Subject:** Re: Your request (431426) has been updated  


Bonjour Pablo,


Merci de nous avoir contactés.


Vous pouvez à tout moment consulter les données personnelles inscrites à votre compte en vous connectant à votre Espace BIXI. Celles-ci comprennent votre nom, genre, date de naissance, numéro de téléphone, adresse courriel, adresse postale, carte de paiement (BIXI n’a accès qu'aux six premiers et quatre derniers chiffres ainsi que la date d'expiration, les autres données sont chiffrées et utilisées par les fournisseurs de paiement en ligne conformément à la norme PCI-DSS). Les autres données sont, telles que stipulées dans l'article 18, des données de géolocalisation si l'option est activée sur l'application, et des données sur l'utilisation des vélos BIXI.


BIXI ne conserve les renseignements personnels recueillis que pour la durée nécessaire aux fins listées à l’article 18.5, et pour se conformer à ses obligations légales et réglementaires. La durée peut varier, tel que vous l'avez remarqué dans l'article 18.9, par exemple si vous cherchez à ce que nous anonymisions vos données BIXI liées à votre compte dans les jours suivants, nous pouvons procéder ainsi. Nous vous prions simplement de répondre à courriel afin d'approuver les conditions suivantes :


- Vous n'aurez plus accès à votre compte ni votre historique de déplacements et vos identifiants de connexion seront annulés
- Vous ne recevrez plus de communications de la part de BIXI
- Tout autre compte relié à vos informations de carte de crédit sera annulé aussi


En espérant avoir répondu à vos questions,


Nous vous remercions pour votre temps et bonne journée,


Eva  
BIXI Montréal  
T : 514-789-2494  
W : www.bixi.com


---


**From:** Pablo Collin  
**Sent:** February 7, 2024, 23:23  
**To:** BIXI Montréal <info@bixi.com>  
**Subject:** À l’attention du responsable de la protection des Renseignements personnels


À l’attention du responsable de la protection des Renseignements personnels,


Conformément à l’article 18.11 des conditions d’utilisation BIXI, je souhaiterais consulter les données personnelles me concernant que vous détenez.


Je souhaiterais aussi avoir plus de renseignements sur la durée de conservation des données personnelles des utilisateurs par BIXI. En effet, l’article 18.9 est particulièrement flou dans le sens où n'y sont indiqués ni durée chiffrée ni conditions entraînant la destruction des données.


Merci d’avance pour votre assistance,


Bien à vous,


Pablo Collin


--- 


[End of email conversation with BIXI]


---










## Bibliography:


1. Shaheen, S. A., & Cohen, A. P. (2022). Bike Sharing: History, Impacts, Models of Provision and Future. Transportation Research Interdisciplinary Perspectives, 10, 100446. https://doi.org/10.1016/j.trip.2021.100446


2. Bruemmer, R. (2013, April 18). Montreal mayor unveils new Bixi app at official launch. Global News. https://globalnews.ca/news/492607/492607/


2. Bohn, D. (2018, September 28). The Secret Data Collected by Dockless Bikes Is Helping Cities Map Your Movement. MIT Technology Review. https://www.technologyreview.com/2018/09/28/139983/the-secret-data-collected-by-dockless-bikes-is-helping-cities-map-your-movement/


3. Lime. (n.d.). Privacy Policy. Retrieved from https://www.li.me/en-ca/legal/privacy-policy#:~:text=We%20collect%20and%20process%20location,a%20Lime%20user%20is%20riding.


4. Lee, C., & Kim, S. (2022). The Privacy Concerns’ Influences on Bike-Sharing Consumers’ Behavior. Journal of Security and Sustainability Issues, 12(2), 1–16. https://doi.org/10.9770/jssi.2022.12.2(1)


5. Amiri-Aref, M., & Faghih-Imani, A. (2021). What do trip data reveal about bike-sharing system users? Transportation Research Part A: Policy and Practice, 148, 351–369. https://doi.org/10.1016/j.tra.2021.01.020


6. Bird Canada. (n.d.). Privacy Policy. Retrieved from https://birdcanada.ca/privacy-policy/#:~:text=Devices%3A%20We%20collect%20the%20location,can%20change%20your%20location%2FBluetooth.
