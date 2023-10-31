const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database are connected")
}).catch((e)=>{
    console.log(e)
})