import React, { useEffect, useState } from 'react';
import axios from 'axios';

let VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/getvideos`)
    .then((res) => {
      console.log("Response from backend:", res.data);
      if (Array.isArray(res.data.videos)) {
        console.log("✅ Videos array received:", res.data.videos);
        setVideos(res.data.videos);
      } else {
        console.warn("⚠️ 'videos' is not an array. Received:", res.data.videos);
        setVideos([]);
      // const videoArray = Array.isArray(res.data.videos)
      //   ? res.data.videos
      //   : [];
      // setVideos(videoArray);
  }})
    .catch((error) => {
      console.error('Error fetching videos:', error);
      setVideos([]);
    });
}, []);



  return (
    <div className='video-feed'>
      <h2>Video Feed</h2>
      {videos && videos.length > 0 ? (
  videos.map((video) => (
    <div key={video._id || video._id?.$oid || Math.random()} className='video-card'>
      <h3>{video.title}</h3>
      <p><b>Video URL:</b> {video.videoUrl}</p>
      <p><b>By:</b> {video.uploader?.name || 'Unknown'}</p>
      <p><b>Uploaded on:</b> {new Date(video.createdAt).toLocaleString()}</p>
      <p><b>Description:</b> {video.description}</p>
      <video
        src={video.videoUrl}
        controls
        width="600"
        style={{ maxWidth: '100%' }}
      />
    </div>
  ))
) : (
  <p>No videos uploaded yet.</p>
)}
</div>
  )
}

export default VideoFeed;