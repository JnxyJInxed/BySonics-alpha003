const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : { 
        type : String,
        min : 6
    },
    email : { 
        type : String
    },
    password : { 
        type : String,
        required : true,
        min : 6
    },
    number_of_Record :{
        type : Number
    }
})

UserData = mongoose.connection.useDb('User')

module.exports = UserData.model('UserData', userSchema);