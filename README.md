# MIT-WS-21-22_PV

Project for Modern Internet Technology

Topic : International Office

Team members :
 
 - Shreena Gabani (22100302)
 - Pranjal Vaste (22104564)


**International Office App for THD**


**Documentation**
•	Documentation – mit-ws-21-22_pv/documentation


**Features**
•	Material Design
•	Bootstrap
•	User authentication
•	Multilingual support (English and Deutsch)
•	Events
•	News
•	Mensa
•	Route guards for external and logged in users
•	Interceptor for login caching

**Requirements - install in OS before running this application**
1.	Nodejs version 10 or higher
2.	Mongodb server
3.	Windows 10 , Linux, IOS

**Starting in Development mode**

To start the app in Development mode follwoing steps are required. Clone this repo to your desktop.

_Setup - running api backend_

1.	Go to directory repo/server-ws-21-22, open cmd, and run npm install to install all the dependencies for api endpoints.
2.	Once installation is finished, run the following commands to setup the environment.
3.	Now run npm run start:watch to start server

_Setup - running front end client_

1.	Go to directory repo/src, and run npm install to install all the angular client. 
2.	open cmd in repo/src and run ng serve to start the angular project. Now go to browser and access the client on http://localhost:4200/

_Adding admin account_

Admin account can be added in the following steps.
1.	go to http://localhost:4200/register and choose user type as "Admin".
2.	For normal user create account with user type as "Student".





