import React, {useState, useEffect} from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'
import Portada from '../Portada/Portada'


const Home = () => {

  const [loadingStatus, setLoadingStatus] = useState (true)
  
  useEffect(() => {
    setTimeout(() => setLoadingStatus(false), 2500)
  }, [])
  
    return (
      <>
      {loadingStatus === false ? (
      <div className='HomePage'>
          <img className='LogoHome' src= "https://www.insightswebagency.com/wp-content/uploads/2021/10/webmaster-freelance.png" alt='Logo1'/>
          <div className='derechaHome'>
          <ul>
              <li>
  
                  <Link to='/login'>LOG IN</Link>
              </li>
              <li>
                  <Link to='/register'>REGISTER</Link>
              </li>
          </ul>
          <p>Find your programming mentor in less than 3 minutes</p>
          </div>
      </div>
      ) : (
        <Portada/>
      )};
    </>
    );
  }

export default Home