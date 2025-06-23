import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'

const Login = () => {
  let [data,setdata]=useState({"email":"","password":""})
  let [msg,setmsg]=useState("")
  let navigate=useNavigate()
  let obj=useContext(Ct)

  let fun=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
    setmsg("")
  }

  let login=()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/login`,data).then((res)=>{
      if(res.data.token!==undefined)
      {
        obj.updatestate({
          token: res.data.token,
          name: res.data.name,
          email: res.data.email
        })
        navigate("/")
      }
      else{
        setmsg(res.data.msg)
      }
    }).catch((error)=>{
        console.error(error);
        setmsg("Login failed. Please try again")   
    })
  }

  return (
    <div className='login'>
      {msg &&<div className='msg'>{msg}</div>}
      <h2>Login</h2>
      <input type='email' placeholder='enter email' onChange={fun} name='email' value={data.email} aria-label="Email"/>
      <input type='password' placeholder='enter password' onChange={fun} name='password' value={data.password} aria-label="Password"/>
      <button className='btn' onClick={login}>Login</button>
    </div>
  )
}

export default Login