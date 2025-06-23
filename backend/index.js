const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const route = require('./routes/route');
const mongoose= require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error)
})

let app=express()

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.use("/",route)
const PORT = process.env.PORT || 5002;
app.get('/', (req, res) => {
  res.send('Backend is live!');
});
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})