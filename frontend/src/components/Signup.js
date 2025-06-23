import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let [data, setData] = useState({ name: '', email: '', password: '' })
  let [msg,setmsg]=useState("")
  let navigate = useNavigate()

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setmsg("")
  };


let register=()=>{
    if(data.name!==""&&data.email!==""&&data.password!=="")
    {
      axios.post(`${process.env.REACT_APP_API_URL}/signup`,data).then((res)=>{
        setmsg("Email already registered. Please log in.")
        if(res.data.msg==="Account created successfully")
        {
          navigate("/login")
        }
        else
        {
          setmsg(res.data.msg || "Signup failed. Try again.");
        }
      }).catch((error)=>{
        console.log(error); 
        setmsg("signUp failed. Try again.")  
      })
    }
    else
      {
        setmsg("fill all fields")
      }
  }

  return (
    <div className="login">
      {msg &&<div className='msg'>{msg}</div>}
      <h2>SignUp</h2>
      <input name="name" placeholder="Name" onChange={fun} value={data.name} />
      <input name="email" placeholder="Email" onChange={fun} value={data.email}/>
      <input type="password" name="password" placeholder="Password" onChange={fun} value={data.password}/>
      <button className='btn' onClick={register}>Register</button>
    </div>
  );
};

export default Signup;