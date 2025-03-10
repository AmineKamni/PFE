import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import './Login.css'
import Shield from '../img/Shield.png'
const Login = ({changeClicked}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    changeClicked(true)
    await login(email, password)
  }

  return (
    <div className="login-outer">
    <img src={Shield}></img>
    <i id="seperator"></i>
    <div className="login-container">
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      
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

      <button className="apply-bttn" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
  )
}

export default Login