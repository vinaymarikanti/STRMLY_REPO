let express=require("express")
const { signup, login, getProfile, islogin } = require("../controllers/userController")
const { UploadVideo, getVideos } = require("../controllers/videoController")
const upload = require("../middlewares/cloudinaryUpload")

let route=new express.Router()

route.post("/signup",signup)
route.post("/login",login)
route.get("/getprofile",islogin,getProfile)

route.post("/uploadvideo",islogin,upload.single("video"),UploadVideo)
route.get("/getvideos",getVideos)

module.exports=route
