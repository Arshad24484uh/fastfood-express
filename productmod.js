const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    sizes:{
        type:Array,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    offer:{
        type:Number,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    },




})

const ProductModel = new mongoose.model("product",ProductSchema)
module.exports=ProductModel;