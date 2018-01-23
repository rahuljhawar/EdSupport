// defining a mongoose schema 
// including the module
const mongoose = require('mongoose');

// declare schema object.
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({

 ticketid   : {type: String,required:true,unique:true},
 email      : {type:String},
 username   : {type:String,required:true},
 title	   : {type: String,required:true},
 description: { type: String,required:true},
 status: { type: String, default: "open"},
 messages: [{
        sender: {
            type: String
        },
        message: {
            type: String
        },
        created: {
            type: Date,
            default: Date.now
        },
    }],
    created: {
        type: Date,
        default: Date.now
    }
});


module.exports=mongoose.model('Ticket',ticketSchema);