import React from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='HomePage'>
        <img className='LogoHome' src= "https://www.insightswebagency.com/wp-content/uploads/2021/10/webmaster-freelance.png" alt='Logo1'/>
        <ul>
            <li>
                <Link to='/...'>LOG IN</Link>
            </li>
            <li>
                <Link to='/...'>REGISTER</Link>
            </li>
        </ul>
    </div>
  )
}

export default Home