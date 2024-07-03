import React from 'react'
import './Welcome.css'
import Sattelite from '../img/satellite.png'
import { useNavigate } from 'react-router-dom'
import Img from '../img/image.png'
const Welcome = () => {
  const navigate = useNavigate()
  return (
    
    <div className='welcome-outer'>
      
      <div className='welcome-container'>
        <h1 className='welcome-info'>WELCOME<p id='extra-text'>TO PFE GESTION</p>
        </h1>
        <div className='welcome-satellite'>
          <img id='sat' src={Sattelite}></img>
        </div>
      </div>
      <div className='welcome-buttons'>
          <button className='welcome-login' onClick={()=>navigate('/login')}>Sign in</button>          <button className='welcome-register' onClick={()=>navigate('/signup')}>Register</button>
        </div>

    </div>

  
  )
}

export default Welcome