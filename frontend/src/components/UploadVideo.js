import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'
const UploadVideo = () => {
  let [data,setdata]=useState({'title':'','description':''})
  let fun=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setdata({...data,"video":e.target.files[0]})
  }
  let navigate=useNavigate()
  let obj=useContext(Ct)
  useEffect(()=>{
    if(obj.state.token==="")
    {
      navigate("/login")
    }
  })

  let upload=(e)=>{
    e.preventDefault()
    let fd=new FormData()
    fd.append('title', data.title)
    fd.append('description', data.description)
    fd.append('video', data.video)
    axios.post(`${process.env.REACT_APP_API_URL}/uploadvideo`,fd,{
      headers: {
      Authorization: `Bearer ${obj.state.token}`}}).then((res)=>{
      navigate("/")
    }).catch((error)=>{
        console.error(error)
    })
  }
  return (
    <form onSubmit={upload} className='login'>
      <h2>Upload Video</h2>
      <input type='text' name="title" placeholder="Title" onChange={fun} value={data.title} required />
      <textarea
        name="description"
        placeholder="Description"
        onChange={fun}
        required value={data.description}
        rows={4}/>
      <div className='file'><input type="file" accept="video/mp4" onChange={fun1} required /></div>
      <button className='btn' type='submit'>Upload</button>
    </form>
  );
}
export default UploadVideo;