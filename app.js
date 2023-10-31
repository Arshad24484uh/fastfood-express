const express = require('express');
const cors = require('cors')
require("dotenv").config();
const Ordermodel = require('./ordermodel');
const Deliverymodel = require("./deliverymodel");
const PORT = process.env.PORT ||8000;
const app = express();


require('./mongoose');
const ProductModel = require("./productmod");
const User = require("./model")
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("hello arshad")
})





app.post("/register", async (req, res) => {
  const { fullname, email, mobile, password } = await req.body;

  const register = await User({
    fullname,
    email,
    mobile,
    password
  });

  const data = await register.save();

  res.json({ success: true, details: data })
  res.status(200);

  console.log(data);
})


// here are we defining login functionality
app.post("/login",async (req,res)=>{
  try {
     const email = req.body.email;
     const password = req.body.password;
     console.log(email,password)
let data = await User.findOne({email:email});

if(email===data.email && password===data.password){
  res.json({find:"true",state:200,details:data})
  console.log("data find successfully")
}else{
  res.json({success:false,state:404,massage:"user not found"})
}


  } catch (error) {
    console.log(error)
  }
})

app.post("/addproduct", async (req, res) => {
  try {
    const { title, desc, price, item, image, category, offer, rate, type } = await req.body;
    const product = await ProductModel({
      title: title,
      desc: desc,
      price: price,
      sizes: [item],
      category: category,
      image: image,
      offer: offer,
      rating: rate,
      type: type


    })
    const data = await product.save();
    res.send({ massage: data, status: "ok", success: true })
    console.log(data);

  } catch (error) {
    console.log(error)
  }
})


app.get('/find', async (req, res) => {
  try {
    const data = await ProductModel.find()
    if (data) {
      res.send(data)
    } else {
      res.status(400).json({ success: false, status: 400 })
    }
  } catch (error) {
    console.log(error)

  }
})
app.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.findById({ _id: id })
    if (data) {
      res.send(data)
    } else {
      res.send("data not found")
    }
  } catch (error) {
    console.log(error)

  }
})


//here we define orders request

app.post("/orders", async (req, res) => {
  const {  user, newarr,totalprice,address } = await req.body;
  let orderId = 'OD' + Math.floor(Math.random()*98876461)
  try {
   const order = await Ordermodel({
    userId:user,
    orders:[newarr],
    totalAmount:totalprice,
    payment:'',
    orderId:orderId,
    address:[address]
   })

   const data = await order.save();
   console.log(data)
   res.json({massage:"order success",success:true,response:data}).status(200)
  } catch (error) {
     res.status(404)
     console.log(error)
  }
})

app.put('/updatepayment/:orderId',async (req,res)=>{

  try{
    let result = await Ordermodel.updateOne({orderId:req.params.orderId},{$set:req.body})
  
    res.json({success:true,response:result,massage:"payment successfully updated"})
  console.log(result)
  
  }catch(e){
    console.log(e);
  }
})

//here are we defining delivey availibikity route

app.post("/addDelivery", async (req,res)=>{
  const {pincode,area,city,district,state} = await req.body;
  console.log(pincode,area,city,district,state)

  try {
    const  deliver = await Deliverymodel({
      area:area,
      pincode:pincode,
      city:city,
      district:district,
      state:state
    })

    let data = await deliver.save();
    console.log(data);
  } catch (error) {
    console.log(error)
  }

})



app.get("/findarea/:pincode",async (req,res)=>{
    
let result = await Deliverymodel.find( {pincode:req.params.pincode})

res.send(result)

})

app.get("/findarea",async (req,res)=>{
  let result = await Deliverymodel.find();
  console.log(res);
  res.send(result)
})

app.get("/getorders/:userid", async (req,res)=>{
  try {
    let data = await Ordermodel.find({userId:req.params.userid});
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})

app.get("/findcategory/:query",async (req,res)=>{
  try {
    let data = await ProductModel.find({category:req.params.query})
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})











app.listen(PORT, () => {
  console.log(`server started on ${PORT}`)
})