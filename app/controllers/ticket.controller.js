const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const events = require('events');
const nodemailer = require('nodemailer');
// express router used to define routes 
const ticketRouter  = express.Router();
const userRouter  = express.Router();
const ticketModel = mongoose.model('Ticket');
const userModel = mongoose.model('User')
//libraries and middlewares
const config = require('./../../config/config.js');
const responseGenerator = require('./../../libs/responseGenerator');
const auth = require("./../../middlewares/auth");
const eventEmitter = new events.EventEmitter();
const randomstring = require("randomstring");

// Event when admin sends a message for a particular ticket
eventEmitter.on('Admin-Message', function (data) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.username,
            pass: config.pass
        }
    });

    let mailOptions = {
        from: 'EdSupport <rahuljhawar88@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Admin replied to your query', // Subject line
        html: `<p>Hello,
                A new message has been received from admin, regarding your query. Please login and check whether your query is resolved or not.
             </p>` // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log("Mail sent" + info);
    });
});

// Event when user sends a message for a particular ticket
eventEmitter.on('User-Message', function (data) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.username,
            pass: config.pass
        }
    });

    let mailOptions = {
        from: 'EdSupport <rahuljhawar88@gmail.com>', // sender address
        to: 'rahuljhawar88@gmail.com', // list of receivers
        subject: 'A user replied to your query', // Subject line
        html: `<p>Hello Admin,
                A new message has been received from a user, regarding his query. Please login and check whether his query is resolved or not.
             </p>` // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log("Mail sent" + info);
    });
});


// Event trigggered when user/admin closes the ticket
eventEmitter.on('status-change', function (data) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.username,
            pass: config.pass
        }
    });

    let mails = [data.email, "rahuljhawar88@gmail.com"];
    let mailList = mails.toString();
    //console.log(mailList);

    let mailOptions = {
        from: 'EdSupport <rahuljhawar88@gmail.com>', // sender address
        to: mailList, // list of receivers
        subject: 'Status Changed!', // Subject line
        html: `<p>Hello,
                        A query with id <b>${data.ticketid}</b> has been successfully closed!
                     </p>` // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log("Mail sent " + info);
    });
});



module.exports.controller=(app)=>{

//route to get the current user
ticketRouter.get('/currentUser',(req,res)=>{
    let user=req.user;
    res.send(user);
});

//route to post a ticket
ticketRouter.post('/createTicket',(req,res)=>{
	const newTicket = new ticketModel({
		ticketid			: randomstring.generate(10),
		username			: req.user.firstName + ' ' + req.user.lastName,
		email				: req.user.email, 
		title 				: req.body.title,
		description			: req.body.description

	});// end new ticket 

	newTicket.save((err)=>{
		if(err){
			const myResponse=responseGenerator.generate(true,"There was some error posting yout query.",500,null);
			res.send(myResponse);
		}else{

			const myResponse=responseGenerator.generate(false,"Your ticket is raised successfully!",200,newTicket);
			res.send(myResponse);
		}
	});
 
});//end of create ticket route

// Single Ticket Based on Ticket ID
ticketRouter.get('/ticket/:id',(req,res)=>{
	ticketModel.findOne({ticketid:req.params.id},(err,ticket)=>{
		if(err){
			const response = responseGenerator.generate(true, "Some error", 500, null);
            res.send(response);
		}
		else{
			const myResponse=responseGenerator.generate(false,'success',200,ticket);
			res.send(myResponse);
		}
	});
});//end of route

//route to get all tickets by the user
ticketRouter.get('/tickets',(req,res)=>{
	ticketModel.find({email:req.user.email},(err,tickets)=>{
		if(err){
			const response = responseGenerator.generate(true, "Error retrieving the tickets.", 500, null);
            res.send(response);
		}else {
			const response = responseGenerator.generate(false, "Success", 200, tickets);
            res.send(response);
		}
	});
});//end route

// All tickets in DB
ticketRouter.get('/admin/tickets', (req, res)=> {
    ticketModel.find({},  (err, tickets)=>{
        if (err) {
            const response = responseGenerator.generate(true, "Error retrieving the tickets.", 500, null);
            res.send(response);
        } else {
            const response = responseGenerator.generate(false, "All Tickets", 200, tickets);
            res.send(response);
        }
    });
});//end route


//route to change the status of the ticket

ticketRouter.post('/ticket/statuschange/:id',(req,res)=>{
	ticketModel.findOneAndUpdate({ticketid:req.params.id},{$set:{status:"close"}},{ new: true },(err,docs)=>{
		if(err){
			const response = responseGenerator.generate(true, "Error retrieving the tickets.", 500, null);
            res.send(response);
		}else{
			const response = responseGenerator.generate(false, "Ticket Status successfully changed.", 200, null);
			eventEmitter.emit('status-change',docs);
            res.send(response);
		}
	});
}); //end route

//users message to the ticket raised
ticketRouter.post('/ticket/usermessage/:id',(req,res)=>{
	let message={
		sender:req.user.firstName+' '+req.user.lastName,
		message:req.body.message
	}
	ticketModel.findOneAndUpdate({ticketid:req.params.id},{$push:{messages:message}},(err,docs)=>{
		if(err){
			const response = responseGenerator.generate(true, "Some error", 500, null);
            res.send(response);
		}else{
			eventEmitter.emit('User-Message', req.params.id);
            const response = responseGenerator.generate(false, "Message Sent to the Admin", 200, null);
            res.send(response);
		}
	});
});//end route

//admins message to the ticket raised
ticketRouter.post('/ticket/adminmessage/:id',(req,res)=>{
	let message={
		sender:'Admin',
		message:req.body.message
	}
	ticketModel.findOneAndUpdate({ticketid:req.params.id},{$push:{messages:message}},(err,docs)=>{
		if(err){
			const response = responseGenerator.generate(true, "Some error", 500, null);
            res.send(response);
		}else{
			eventEmitter.emit('Admin-Message', docs);
            const response = responseGenerator.generate(false, "Message Sent to the User", 200, null);
            res.send(response);
		}
	});
});//end route
app.use('/user',auth.verifyToken,ticketRouter);
}
