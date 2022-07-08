import React, { useState } from 'react'
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import { Context } from "./context/LoginStatus"
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
        {localStorage.getItem("token") && <Navbar></Navbar> } 
        <Routes>
            <Route path='/' element={localStorage.getItem("token") ? (<Perfil />) : (<Home />)} />
            <Route path='/login' setLoginStatus={setLoginStatus} element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route exact path='/room/:roomId' element={<ChatRoom/>}/>
            <Route exact path='/room' element={<Chats />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
