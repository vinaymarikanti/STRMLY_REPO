import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UploadVideo from './components/UploadVideo';
import VideoFeed from './components/VideoFeed';
import NavBar from './components/NavBar';
import Ct from './components/Ct';
import './App.css'

function App() {
  const saved = localStorage.getItem('userState')
  const initialState = saved ? JSON.parse(saved) : { token: '', email: '', name: '' };
  const [state,setState]=useState(initialState)

  const updatestate=(obj)=>{
    setState((prevState)=>{
      const newState={...prevState,...obj}
      localStorage.setItem('userState', JSON.stringify(newState))
      return newState
    })
  }

    const contextValue={"state":state,"updatestate":updatestate}

  return (
    <Router>
      <Ct.Provider value={contextValue}>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/" element={<VideoFeed />} />
      </Routes>
      </Ct.Provider>
    </Router>
  );
}

export default App;