const mongo = require("mongoose");

const eventschema = mongo.Schema({
    title : {
        type:String,
        required : [true , "Title not defined!"]
        
    },
    domain : {
        type:String,
        required : [true , "Please enter the specific domain!"]
    },
    description  : {
        type : String
    },
    prize : {
        type : Number,
        required : [true , "Please enter an prize money"]
    },
    startdate : {
        type : Date,
        required : [true , "Please enter an Start Date"]
    },
    enddate : {
        type : Date,
        required : [true , "Please enter an End Date"]
    },
    location : {
        type : String
    },
    image : String,
    
    //^reference 
    user : [
        {
        type:mongo.Schema.Types.ObjectId,
        ref : 'user'
    }
]

});
const event = mongo.model("event" , eventschema);
module.exports = event;