import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { useLogout } from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../img/INPTlogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Breeze from '../img/Breeze.png'
import { grey } from '@mui/material/colors';
const Navbar = ({changeClicked}) => {
    const navigate = useNavigate()
    const{logout} = useLogout()
    const {user} = useAuthContext()
    const [notifications, setNotifications] =useState([])
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)

    useEffect(()=>{
        
        if(user){     
            notificationsGet()  
        }    
    },[])
    const notificationsGet = async () =>{
        const response = await fetch('http://localhost:4000/api/user/'+user.user._id,{ 
            method:'GET', 
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        if(response.ok){
            setNotifications(json.notifications)  
        }
    }
     
    const handleRead = async () =>{
        if(user){
            const mark = await fetch('http://localhost:4000/api/notifications/'+user.user._id,{
                method:'PATCH',
                headers:{'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({notifications:"No notification" })
            })
            if(mark.ok){
                setNotifications([]) 
            } 
             
        }  
         
    }
    const handleClick = () =>{
        navigate('/welcome')
        changeClicked(false)
        logout()
        
    }  
  return (
        <div className='container'>
            <div className='logo'> <img className='logoIMG' onClick={()=>navigate(user?'/':'/welcome')} src={Logo}></img></div>
            
            {user && (<div className="icons">
             
                <div className="icon" onClick={()=>{setOpen(!open);setOpen1(false)}}>
               <NotificationsIcon style={{cursor:'pointer'}} sx={{color:grey[800] ,"&:hover": { color: grey[500] }, "&:active":{ color: grey[900] }, transition:'0.4s' }} fontSize="large"/>
                {notifications.length >0 &&
                <div className="counter">{notifications.length}</div>}
                    {open &&
                    <div className="notifications">
                        {notifications.map(((notif,i)=>(
                        <p id='notif-p' key={i} className="notification" onClick={()=>navigate('/profile/'+notif.source)}>{notif.type}</p>
                        )))}
                        {notifications.length > 0 ? <button className="nButton" onClick={handleRead}>
                        Mark as read {<ChecklistIcon/>}
                        </button> : <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'flex-end'}}>
                            <img style={{height:'60px', width:'auto', marginTop:'15px', padding:'0', opacity:'50%'}} src={Breeze}></img>
                                       <p style={{fontSize:'16px'}}>No notification</p>
                                    </div>}
                    </div>} 
                </div>
                <div  className="icon" onClick={()=>{setOpen1(!open1);setOpen(false)}} >
                    <PersonIcon style={{cursor:'pointer'}} sx={{color:grey[800] ,"&:hover": { color: grey[500] }, "&:active":{ color: grey[900] },  transition:'0.4s' }} fontSize="large"/>
                    {open1 &&  <div className="notifications">
                        <div className='profile-navelement' onClick={()=>navigate('/profile/'+user.user?._id)}><p>{user.user?.username}</p></div>
                        <div className='profile-navelement' onClick={()=>navigate('/contact')}><p>Contact</p></div>
                        <div className='profile-navelement' onClick={()=>navigate('/about')}><p>About</p></div>
                        <button className='logout' onClick={handleClick}>Log out {<LogoutIcon/>}</button>
                        </div>}
                </div>
               
            </div>
            )}
        </div>
  )
}

export default Navbar