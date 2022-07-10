import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  return (
   <>
   <ul className='Navbar'>
    <li> <Link to='/'> <img src='https://cdn-icons-png.flaticon.com/512/4645/4645949.png' alt='profile'></img></Link></li>
    <li> <Link to='/chats'> <img src='https://cdn-icons-png.flaticon.com/512/724/724715.png' alt='Chat'></img></Link></li>
    <li> <Link to='/dashboard'> <img src='https://cdn-icons-png.flaticon.com/512/1416/1416445.png' alt='Finder'></img></Link></li>
   </ul>
   </>
  )
}

export default Navbar