let mongoose=require("mongoose")
let videoSchema=new mongoose.Schema({
    "title":String,
    "description":String,
    "videoUrl":String,
    "uploader": { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true })
let videoModel=mongoose.model("video",videoSchema)
module.exports=videoModel