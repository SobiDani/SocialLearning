import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  return (
   <>
   <ul className='Navbar'>
    <li> <Link to='/.......'> <img src='https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1657184112~hmac=a49c9dac8284d876c9c0e645418a76c3' alt='profile'></img></Link></li>
    <li> <Link to='/.......'> <img src='https://cdn-icons-png.flaticon.com/512/724/724715.png' alt='Chat'></img></Link></li>
    <li> <Link to='/.......'> <img src='https://cdn-icons-png.flaticon.com/512/1416/1416445.png' alt='Finder'></img></Link></li>
   </ul>
   </>
  )
}

export default Navbar