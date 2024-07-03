import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import './AppMini.css'
import {useNavigate} from 'react-router-dom'
const AppMini = ({prop}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const {user} = useAuthContext()
    const [userID, setUserID] = useState(prop.applicant_id)
    const [offerID, setOfferID] = useState(prop.offer_id)
    const [applicationID,setApplicationID] =useState(prop.application_id)
    const [accepted, setAccepted] = useState(false)
    const [isLoading, setIsLoading] = useState([true,true,true])
    async function  getUser (id) {
        if(user){
            
        const response = await fetch('http://localhost:4000/api/user/'+id,{
            method:'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
    
        const json = await response.json()
        setUsername(json.username)     
        isLoading[0] =false
    }      
    }
    async function  getOffer (id) {
        
        if(user){
        const response = await fetch('http://localhost:4000/api/offers/'+id,{
            method:'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        setTitle(json.title)
        isLoading[1] =false
    }
    }
    useEffect(()=>{
       
        getOffer(offerID)
        getUser(userID)
        checkAccepted()
    },[])
    const checkAccepted = async () =>{
        
        const response = await fetch('http://localhost:4000/api/apply/'+applicationID,{
            method: 'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        setAccepted(json.accepted)
        isLoading[2] =false

    }


    const handleClick = async () =>{
        const response = await fetch('http://localhost:4000/api/apply/'+applicationID,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({accepted:true, pending:false})
        })
        const notify = await fetch('http://localhost:4000/api/notifications/'+userID,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({notifications: {type:`${user.user.username} accepted your application to ${title}`, source:user.user._id}})
          })
        
    }
    const goTo = () =>{
        navigate('/profile/'+userID)
    }
  return (

    <div className='appmini'>
        {(isLoading[0]==isLoading[1]==isLoading[2]==true)?<div className="lds-ring"><div></div><div></div><div></div><div></div></div>:
        <>
            <p>Student: {username}</p>
            <p>Offer: {title}</p>
            <button className='apply-bttn' onClick={goTo}>Acess student profile</button>
            {!accepted?<button className='apply-bttn' onClick={handleClick}>Accept</button>
            :<span className='sucess'>Already accepted candidate</span>}


            <hr/>
        </>
        }
        
    </div>
  
  )
}

export default AppMini