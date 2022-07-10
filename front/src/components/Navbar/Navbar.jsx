import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  return (
   <>
   <ul className='Navbar'>
    <li> <Link to='/'> <img src='https://cdn-icons-png.flaticon.com/512/8001/8001957.png' alt='profile'></img></Link></li>
    <li> <Link to='/chats'> <img src='https://cdn-icons-png.flaticon.com/512/7999/7999962.png' alt='Chat'></img></Link></li>
    <li> <Link to='/dashboard'> <img src='https://cdn-icons-png.flaticon.com/512/8000/8000361.png' alt='Finder'></img></Link></li>
   </ul>
   </>
  )
}

export default Navbar