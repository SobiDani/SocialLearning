import React, { useState } from 'react'

import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

import Login from './components/Login/Login'
import Register from './components/Login/Register'
import { Context } from "./context/LoginStatus"

import Navbar from './components/Navbar/Navbar'
import Perfil from './components/Perfil/Perfil'


function App() {

  const [loginStatus, setLoginStatus] = useState();

  /* console.log(loginStatus);
 */
  return (
    <div >
      
      <Context.Provider value={{ loginStatus, setLoginStatus }}>
        <Router>
        {localStorage.getItem("token") && <Navbar></Navbar> } 
        <Routes>
            <Route path='/' element={localStorage.getItem("token") ? (<Perfil />) : (<Home />)} />
            <Route path='/login' setLoginStatus={setLoginStatus} element={<Login />} />
            <Route path='/register'  element={<Register />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
