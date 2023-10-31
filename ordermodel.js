const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Number } = require("twilio/lib/twiml/VoiceResponse");
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    orders:{
        type:Array,
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    },
    address:{
        type:Array,
        require:true
    },

    payment:{
        type:String,
        require:true
    },
   orderId:{
    type:String,
    require:true
   }

   

    
    
    

})

const Ordermodel = new mongoose.model("order",orderSchema);
module.exports= Ordermodel;