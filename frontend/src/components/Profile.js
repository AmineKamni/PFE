import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import './Profile.css'
const Profile =  ({prop}) => {
  const {user} = useAuthContext()
  const [username, setUsername] = useState('')
  const [ modify, setModify]=useState(true)
  const [email, setEmail] = useState('')
  const [password,setPassword] =useState('')
  const [cv,setCv] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.pathname.split("/")[2] || prop;

  useEffect(()=>{
    const getProfile = async () =>{
      const info = await fetch(`http://localhost:4000/api/user/${profileId}`,{
        method: 'GET',
        headers:{'Authorization':`Bearer ${user.token}`}
        })
      const json = await info.json()
      
      setEmail(json.email)
      setUsername(json.username)
      setCv(json.cv)
  
    }
    if(user){
      getProfile()
    }
  },[])
  const handleModify = () =>{
    setModify(false)
  }
  const handleSave = async () =>{
    const response = await fetch(`http://localhost:4000/api/user/${profileId}`,{
        method: 'PATCH',
        headers:{'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`},
        body: JSON.stringify({username:username,email:email,password:password, cv:cv})
    })
    
    setModify(true)
  }
  const handleCancel = () =>{
    setModify(true)
  }
  return (
    
    <div className="profile-out">
      <h2>Profile page</h2>
      {!modify?(
      <div className="profile-container">

      <h3>Modify</h3>
      <div className="profile-form">
      
      <label>Username:</label>
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
      
      <label>CV:</label>
      <input 
        type="cv" 
        onChange={(e) => setCv(e.target.value)} 
        value={cv} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      
      </div>
      <div className="profile-btns">
        <button className='edit-bttn' onClick={handleSave}>Save</button>
        <button className='delete-bttn' onClick={handleCancel}>Cancel</button>
      </div>
      </div>
      )
      :(<div className="profile-container1"> 

      <p>Username : {username}</p>
      <p>Email : {email}</p>
      <p>CV : {cv==''?'CV pas encore depose':cv}</p>
      <button className='edit-bttn' onClick={handleModify}>Modify</button>

      </div>)}
      

    </div>
  )
}

export default Profile