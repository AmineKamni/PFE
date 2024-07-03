import React from 'react'
import './About.css'
import Img from '../img/inpt.png'
const About = () => {
  return (
    <div className='about'>
      <div className='about-description'>
        <h1>ABOUT</h1>
        <p >The National Institute of Posts and Telecommunications, located in Rabat, the administrative capital of Morocco, is one of the leading engineering schools in Morocco. It is affiliated with the ANRT and offers versatile training in the field of information and communication technologies.</p>
      </div>
      <div className='about-image'>
        <img className='about-img' src={Img}></img>
      </div>
    </div>
  )
}

export default About