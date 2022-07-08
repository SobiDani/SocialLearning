import React, { useState } from 'react'

import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

import Login from './components/Login/Login'
import Register from './components/Login/Register'
import { Context } from "./context/LoginStatus"
import Test from './pages/Test';
import SwipeCard from './pages/SwipeCards/SwipeCard';
import Dashboard from './pages/Dashboard/Dashboard';

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
            <Route path='/swipe' element={<SwipeCard />} />
            <Route path='/test' element={<Test />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
