import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Perfil from '../components/Perfil/Perfil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Test = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </Router>  

    </div>
  )
}

export default Test