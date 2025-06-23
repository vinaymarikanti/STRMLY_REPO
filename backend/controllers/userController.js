let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const userModel = require("../models/user")

let signup=async(req,res)=>{
    try
    {
        let existingUser=await userModel.findOne({"email":req.body.email})
        if(existingUser)
        {
          return res.json({ msg: "Email already registered. Please login." })
        }
        else
        {
            let hashedPassword=await bcrypt.hash(req.body.password,10)
            let newUser=new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            await newUser.save()
            res.json({"msg":"Account created successfully"})
        }
    }
    catch(error)
    {
        res.json({"msg":"error in signUp"})
    }
}

let login=async(req,res)=>{
    try
    {
        let user=await userModel.findOne({"email":req.body.email})
        if(user)
        {
            let f=await bcrypt.compare(req.body.password,user.password)
            if(f)
            {
                let token=jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '2h' })
                res.json({
                    token,
                    name: user.name,
                    email: user.email
                });
            }
            else
            {
                res.json({"msg":"check password"})
            }
        }
        else
        {
            res.json({"msg":"check e-mail id"})
        }
    }
    catch(error)
    {
        res.json({"msg":"error in login"})
    }
}
let getProfile=async(req,res)=>{
    try
    {
        let user=await userModel.findById(req.userId).select("-password")
        if(!user)
        {
            res.json({"msg":"user not found"})
        }
        res.json(user)
    }
    catch(error)
    {
        res.json({"msg":"error in getting profile"})
    }
}
let islogin=(req,res,next)=>{
    try
    {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ msg: 'Access denied. No token provided.' });
    }
       let decoded= jwt.verify(token,process.env.JWT_SECRET)
       req.userId=decoded.id
        next()
    }
    catch(error)
    {
       return res.json({"msg":"please login"})
    }
}

module.exports={signup,login,getProfile,islogin}