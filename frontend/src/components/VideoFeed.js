import React, { useEffect, useState } from 'react';
import axios from 'axios';

let VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/getvideos`)
    .then((res) => {
      console.log("Response from backend:", res.data);
      const videoArray = Array.isArray(res.data)
        ? res.data
        : [];
      setVideos(videoArray);
    })
    .catch((error) => {
      console.error('Error fetching videos:', error);
      setVideos([]);
    });
}, []);



  return (
    <div className='video-feed'>
      <h2>Video Feed</h2>
      {videos.length === 0 && <p>No videos uploaded yet.</p>}
      {videos.map((video) => (
        <div key={video._id} className='video-card'>
          <h3>{video.title}</h3>
          <p><b>Video URL:</b>{video.videoUrl}</p>
          <p><b>By: {video.uploader?.name || 'Unknown'}</b></p>
          <p><b>Uploaded on:</b> {new Date(video.createdAt).toLocaleString()}</p>
          <p><b>Description:</b>{video.description}</p>
          <video
            src={video.videoUrl}
            controls
            width="600"
            style={{ maxWidth: '100%' }}/>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;