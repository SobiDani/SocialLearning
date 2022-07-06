import React, { useState } from 'react'

import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

import Login from './components/Login/Login'
import Register from './components/Login/Register'
import { Context } from "./context/LoginStatus"

function App() {
  const [loginStatus, setLoginStatus] = useState(!localStorage.getItem("token") ? false : true);


  return (
    <div >
      <Context.Provider value={{ loginStatus, setLoginStatus }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
