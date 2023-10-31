const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    },
    
});


const User = new mongoose.model('userRigester',UserSchema);
module.exports= User;