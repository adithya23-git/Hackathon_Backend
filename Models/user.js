const mongo = require("mongoose");
const validator = require("validator");
const userschema = mongo.Schema({
    fname : {
        type : String,
        required : [true , "You should enter your first name"]
    },
    lname : {
        type : String,
       required : [true , "You should enter your last name"]
    },

    role : {
        type:String,
        enum : ['participant' , 'organizer'],
        default : 'participant'
    },
    email : {
        type : String,
        required : [true , "please provide your email !!"],
        unique : true,
        lowercase : true,
       // validate : [validator.isEmail , "Please provide an valid email !!"]
    },

    password : {
        type : String,
        required : [true , "Please enter your password !!"],
        minlength : 8,
        select : false
    },

    confirmpassword : {
        type : String,
        //This only  work on create and  save !!
        // validate : {
        //     validator : function(val) {
        //         return this.password === val;
        //     },
        //     message : 'Passwords are not same !!'
        // }
    },

    //^ event ref
     event : [
            {
            type:mongo.Schema.Types.ObjectId,
            ref : 'event'
        }
    ]
});


const user = mongo.model('user' , userschema);
module.exports = user;
