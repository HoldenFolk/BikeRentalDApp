## Mobility apps and privacy, a case study on the BIXI app

BIXI: 
- It’s a useful service
- Before we used to be able to use a key that you previously purchased in order to unlock a bike. It made this service less accessible to the public. All users are invited to download the application, and to even know that a Bixi key is an option, the user has to look it up. 

Main problem is storing individual data in a non-private way (allowing a 3rd party to track back to the individual in case of a leak). Also a problem about diffusing aggregated stats that could let people be singled out. 


(The big questions)
1.
What we think Bixi actually need in order to work: 


What it asks for (what it collects):


2.
Its predecessor:
FIrst it was kiosk based with a credit card. You could subscribe to a membership and receive a card/key allowing you to unlock your BIXI. The mobile app was introduced in 2013. They kept concurrent services until 2021 when they decided to remove the key/card option “to limit plastic pollution” (and gather a ton of valuable data on all their users). However you can still get a BIXI key if you call them and make a 15$ payment (they will ship it to you). They still maintain a database with all your personal information and ride history though, as the key is linked to your account. They can hence record the location and time when you took the bike as well as when you returned it, with the info being linked to your profile. 

The differences:


3.
The privacy threats:


The privacy policy:


Where is the line (what user thinks they give vs what they actually give)





Citation from a BIXI employee who started working there in 2010: “We know our users very, very well” (1). Users’ patterns are analyzed, Blain explained, and with nearly six years of data collected, Blain is able to make very accurate predictions.


**Introduction** 

- What is the technology transition
- What is the application of this technology 
- What are the privacy implications of the technology transition 

Large-scale bike sharing services have a short but dense history, shaped by the successive technological revolutions of the past 30 years. It began in Copenhagen in 1995 with the launching of Bycyklen. The system was very straightforward: multiple bike racks were layed out accross the city. Users could unlock a bike by inserting a coin. They could later recover their coin by rechaining their bike at any other station (similarly to how shopping carts are retrieved in supermarkets). This system was completely anonymous and untraceable, ten out of ten in terms of privacy.

In 2009, BIXI was launched using a totally different system: docking stations were electronized. This system is much more privacy invasive as each ride's data (start and finish time and location) is stored in databases for analysis. Regular users could subscribe to a membership and receive a magnetic card/key which they would use to unlock bikes. They must give in their name, adress, phone number and email to register. One time users must pay by credit card at the stations. In either case, BIXI's databases contained enough information to profile each user's riding habits and link it with their personal data. Note that one time users preserve relative anonymity (unless someone crosses BIXI's database with their credit card provider's database). This profiling of users is a goldmine of personal information.

In 2013, BIXI introduced a new feature to their service: the Mobile app. This allows for users to see the availability of nearby stations in real time among other features. But these new features bring additional privacy concerns: BIXI now has access to the live location of all active users, allowing them to derive live information such as speed and precise itinerary of each trip. We will dwelve deeper into the privacy implications of this new layer of data added to BIXI's databases in the rest of this report. Both systems were concurrent until 2021, when BIXI removed the magnetic card service for regular users. To this day, it forces them to use the app. One-time purchases are also facilitated through the app, making it even more unavoidable.

**Research Method**

- State what the research questions are:
    - For each quesiton state what we need to do to answer these questions and analyse the data
    - The results of this analysis will then be added to the results section

**Results** 

- Findings from research. What insights are there into BIXI 
- Are there any studies or research done into the privacy implications of this technology - Andrew
- Have there been other attempts to solve this issue? What can we learn from these?
- What data can we find that bixi is currently collecting - Holden

**Conclusion**
	
- How does all this data relate to the privacy violations?
- Here is where we will include the insights that we find from the data.
- What the results mean and why are they important


**APPENDIX:**

https://montrealgazette.com/news/local-news/managing-the-bixi-maze-a-day-in-the-life-of-montreals-bike-sharing-service-part-i

# ANTONIN

links

Bixi privacy policy : https://bixi.com/en/terms-and-conditions/


18.5.8 Any other purpose that the Provider may identify from time to time and that is permitted by law or for which the Provider obtains specific consent from the user.
The Provider may also disclose Personal Information to third parties if necessary to protect its assets or enforce its rights, including the collection of a debt.
18.12 The Provider has appointed a Privacy Officer to oversee compliance with its Personal Information protection practices.

## Research Methods
I read the privacy policies of BIXI, LIME, BIRD CANADA, and Citi Bike. I compared the policies with PIPEDA and GDPR since most of the companies are providing services in Canada and Europe. I did some research on legal cases where ride-sharing services were involved. I searched for research papers on the implications of the data that the companies collect.

## Results
The policies of BIXI, LIME, BIRD CANADA, and Citi Bike were very general. It was difficult to find proper documentation on the delimitations they have in place to minimize the collection and use of personal data. They justify their collection by stating that they provide a service and need to improve it. However, the service is not clearly defined, and neither are their data retention policies, other than keeping data as long as it fulfills the purpose for which it was collected, generally to improve or provide the service. Similarly, the safeguards used to guarantee proper protection of the data are described as 'secure', but the level of security is not clearly specified.
In the case of BIXI, their privacy policy states that a user can limit the collection of personal data, but doing so would reduce the features the user has access to. However, this claim is questionable as some services are closed off even when the data they require is unnecessary for their operation. Moreover, some of these companies share data with third parties known for their questionable privacy policies, such as Meta and Google.
Unfortunately, there are not many papers talking about the implications and what BIXI could possibly do with all of the data they collect. But, we can assume that they build machine learnig model to predict a user movements using previous trips. Also, they could propably estimate your physical conditions and use it to profile you.

## Conclusion
At first glance, one could argue that these ride-sharing companies are compliant with regulations such as PIPEDA and GDPR. However, as shown before, they lack openness and transparency with their users. This lack of transparency poses a serious threat to customer privacy as users are asked to consent to vaguely defined policies. This is concerning because these companies make it seem like users consent to all activities, but in reality, users don't know what these companies are actually doing with their data.
It's a recurring theme for these companies to justify their actions by claiming to improve their services. However, the service provided by each of these companies changes over time, making it almost impossible to argue that old data was not collected for the new service. This poses a threat of secondary use, and without enforcing proper delimitations in the privacy policies, this threat won't cease.
Now that we discussed the extensive data use and retention practices of these companies, it's crucial to explore the profound implications of such practices. Just by analyzing the data collected in accordance with their privacy policies, it becomes evident that even in the absence of your name, these companies could effortlessly identify you using publicly available information. Moreover, they possess the capability to construct detailed profiles based on trip data, potentially exposing sensitive aspects of your physical condition.
Furthermore, by leveraging real-time data, these companies could easily ascertain whether you are at home or not, thereby encroaching upon your privacy and engaging in unwarranted surveillance. This intrusion into personal space raises significant concerns regarding individual autonomy and the right to privacy.

