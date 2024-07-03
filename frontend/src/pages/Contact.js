import React from 'react'
import Users from '../components/Users'
import './Contact.css'
const Contact = () => {
  const getFormSubmitHandler = () =>{
    
  }
  return (
    
      <div className='contact-container'>
        <h1 className='page-title'>Contact Us</h1>
              <form className='contact-form' onSubmit={getFormSubmitHandler()}>
        <div className='contact-separator'>
        <div className="contact-name">
          <input
            type="text"
            placeholder="Your name"
            name="name"
            required
          />
        </div>
        <div className="contact-email">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        </div>
        <div className="contact-message">
          <textarea
            placeholder="Your message"
            name="message"
            required
          />
        </div>
        <div className="contact-button">
          <button
            className="apply-bttn"
            type="submit"
          >
            Send a message 
          </button>
        </div>
      </form>
      </div>
    
  )
}

export default Contact