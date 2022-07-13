import React, { useState } from 'react'
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import { Context } from "./context/LoginStatus"
import Dashboard from './pages/Dashboard/Dashboard';
import ChatRoom from './components/Chat/ChatRoom';
import Chats from './pages/Chats/Chats';
import Perfil from './components/Perfil/Perfil'
import Navbar from './components/Navbar/Navbar'




function App() {

  const [loginStatus, setLoginStatus] = useState();

  return (
    <div >

      <Context.Provider value={{ loginStatus, setLoginStatus }}>
        <Router>
      
          <Routes>

            <Route path='/' element={localStorage.getItem("token") ? (<Perfil />) : (<Home />)} />
            <Route path='/login' setLoginStatus={setLoginStatus} element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route exact path='/chats/:roomId' element={<ChatRoom />} />
            <Route exact path='/chats' element={<Chats />} />
          </Routes>
          {localStorage.getItem("token") && <Navbar></Navbar>}
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
