# EdSupport
https://warm-ridge-35602.herokuapp.com

# Assumption
* Please signup with email as '**admin@edsupport.com**' to get the admin access of this system.
This is a ticket based support system web app where you can raise a query and get it resolved by the admin. The apo has two views as below
1. A view for the user.
- This view contains a view where user can register or signup.
- The user can raise query and get a reply from the admin.
- The user can close a query.
- The user can see details of a particular query.

2. A view for the admin
- Here admin can login and see all queries by the user.
- The admin can reply to the queries. The reply is in a chat format.
- The user can close a query.
# Features
  - A welcome mail is sent on successful signup.
	- When the status of ticket is altered an email noticaion is sent to both admin and user.
	-When the person receives a message or the admin receives the reply, an email notification is sent to that particular user.
	-For the sake of simplicity, treated the Admin as a user of the system. No special backend for admin.
  
  **Security**
		 - Secured with JWT.
		 - Default JWT expiry time is set to 60 minutes.

**Single page application.**

  **Forgot password.**
        ~ An OTP string is sent to email to reset password
# Prerequisite
- Git
- NodeJs
- Npm
- MongoDB

# Running the project
1. Download the zip file and unzip it.
2. Open the server folder of the project in cmd
3. Type `npm install` to install all the dependencies
4. Type node app.js . The project starts running on localhost:3000

# Technologies used:
# Frontend
HTML 5,CSS3, Bootstrap,AngularJS

# Backend
NodeJs,ExpressJs,MongoDB, JSONWebToken

# API tool
Postman

# OS used: 
Windows 10

# Editor used:
Sublime Text
