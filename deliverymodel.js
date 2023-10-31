const mongoose = require("mongoose");
const DeliverySchema = new mongoose.Schema({
    pincode:{
        type:Number,
        require:true
    },

    area:{
        type:String,
        require:true
    },

    city:{
        type:String,
        require:true
    },

    district:{
        type:String,
        require:true
    },

    state:{
        type:String,
        require:true
    }
});

const Deliverymodel = new mongoose.model("deliverymodel",DeliverySchema);
module.exports=Deliverymodel;