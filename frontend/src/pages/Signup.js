import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import './Signup.css'
import Shield from '../img/Shield.png'
const Signup = ({changeClicked}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [capacity, setCapacity] = useState('Student')
  const [field, setField]= useState('ASEDS')
  const {signup, error, isLoading} = useSignup()
  const handleFieldChange =(e) =>{
    setField(e.target.value)
  }
  const handleChange = (e) => {
    setCapacity(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    changeClicked(true)
    await signup(username, email, password, capacity, field)
  }

  return (
    <div className="signup-outer">

    <div className="signup-container">
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Capacity:</label>
      <select value={capacity} onChange={handleChange} >
        <option value='Student'>Student</option>
        <option value='Teacher'>Teacher</option>
        <option value='Enterprise'>Enterprise</option>
      </select>
      {capacity == 'Enterprise'?<label>Company name</label>:<label>Name & Surname:</label>}
      <input 
        type="username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      {(capacity =='Student')?
      <div>
        <label>Study Field:</label>
      <select value={field} onChange={handleFieldChange} >
        <option value='ASEDS'>ASEDS</option>
        <option value='AMOA'>AMOA</option>
        <option value='DATA'>DATA</option>
        <option value='ICCN'>ICCN</option>
        <option value='SESNum'>SESNum</option>
        <option value='SmartICT'>SmartICT</option>
        <option value='SUD-Cloud&IoT'>SUD-Cloud&IoT</option>
      </select>
      </div>
      :<></>}
      

      <button className="apply-bttn" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error} </div>}
    </form>
    </div>
    <i id="seperator"></i>
    <img src={Shield}></img>

    </div>
  )
}

export default Signup