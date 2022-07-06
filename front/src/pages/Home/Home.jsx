import React from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='HomePage'>
        <img className='LogoHome' src= "https://www.insightswebagency.com/wp-content/uploads/2021/10/webmaster-freelance.png" alt='Logo1'/>
        <div className='derechaHome'>
        <ul>
            <li>
                <Link to='/...'>LOGIN</Link>
            </li>
            <li>
                <Link to='/...'>REGISTER</Link>
            </li>
        </ul>
        <p>Find your programming mentor in less than 3 minutes</p>
        </div>
    </div>
  )
}

export default Home