// defining a mongoose schema 
// including the module
const mongoose = require('mongoose');

// declare schema object.
const Schema = mongoose.Schema;

const userSchema = new Schema({

	firstName  			: {type:String,default:''},
	lastName  			: {type:String,default:''},
	email	  			: {type:String,default:'',required:true},
	mobileNumber  		: {type:Number,default:'',reuired:true},
	password			: {type:String,required:true}
});


module.exports=mongoose.model('User',userSchema);