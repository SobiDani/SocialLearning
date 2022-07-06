import React from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='HomePage'>
        <img className='LogoHome' src= "https://www.insightswebagency.com/wp-content/uploads/2021/10/webmaster-freelance.png" alt='Logo1'/>
        <ul>
            <li>
                <Link to='/login'>LOG IN</Link>
            </li>
            <li>
                <Link to='/register'>REGISTER</Link>
            </li>
        </ul>
    </div>
  )
}

export default Home