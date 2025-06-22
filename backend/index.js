const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const route = require('./routes/route');
const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/STRMLYDB").then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error)
})

let app=express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.use("/",route)

let port=5002
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})