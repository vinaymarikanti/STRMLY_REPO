const videoModel = require("../models/video")

let UploadVideo=async(req,res)=>{
    try{
        let { title, description } = req.body;

        if (!title || !description || !req.file) {
            return res.json({ msg: 'All fields are required' });
        }
    let data= await videoModel.create({
      title,
      description,
      videoUrl: req.file.path,
      uploader: req.userId,
    });
    res.json(data);
    }
    catch(error)
    {
        console.error("Upload error:", error)
        res.json({"msg":"error in uploadVideo"})
    }
}

let getVideos=async(req,res)=>{
    try
    {
        let data=await videoModel.find().sort({ createdAt: -1 }).populate('uploader', 'name');
        res.json(data)
    }
    catch(error)
    {
       console.error("Get videos error:", error)
       res.json({"msg":"error in fetching videos"}) 
    }
}

module.exports={UploadVideo,getVideos}