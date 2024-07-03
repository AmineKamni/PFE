import React, { useEffect, useState } from 'react'
import {useOffersContext} from '../hooks/useOffersContext'
import {useAuthContext} from '../hooks/useAuthContext'
import './OfferDetails.css'
import { useNavigate } from 'react-router-dom'

const OfferDetails = ({offer}) => {
  const {user} = useAuthContext()
  const {dispatch} = useOffersContext()
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()
  const [accepted, setAccepted] = useState(false)
  const [key, setKey] = useState('')
  const handleClick = async () =>{
    if(!user){
      return
    }
    const response = await fetch('http://localhost:4000/api/offers/' + offer._id,
      {method: 'DELETE',
      headers:{'Authorization':`Bearer ${user.token}`}
    })
    const json = await response.json()
    if(response.ok){
        dispatch({type: 'DELETE_OFFER', payload:json})
    }
  }
  const handleEdit = () =>{
    const path = `/offer/${offer._id}`
    navigate(path)

  }
  const handleApply= async () =>{
    setPending(true)
    const notify = await fetch('http://localhost:4000/api/notifications/'+offer.user_id,{
      method: 'PATCH',
      headers:{'Content-Type': 'application/json',
      'Authorization':`Bearer ${user.token}`},
      body: JSON.stringify({notifications: {type:`${user.user.username} applied to ${offer.title}`, source:user.user._id}})
    })
    const response = await fetch('http://localhost:4000/api/apply',{
      method: 'POST',
        headers:{'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`},
        body: JSON.stringify({offer_id: offer._id, user_id: user.user._id})
    })
  }
  useEffect(() =>{
    const checkApplied = async()=>{
        const applications = await fetch('http://localhost:4000/api/apply',{
          method:'GET',
          headers:{'Authorization':`Bearer ${user.token}`}
        })
        if(applications.ok){
          const result = await applications.json()
          result.forEach((obj, i) =>{
  
            if(user.user._id == obj.user_id  && obj.offer_id == offer._id){
                if(obj.pending == true){
                setPending(true)
                setAccepted(false)
                setKey(obj._id)
                }
                if(obj.accepted==true){
                  setPending(false)
                  setAccepted(true)
                }
            }
          })
        }
       
        
    }
    checkApplied()
  },[])
  const handleCancel = async () =>{
    const response = await fetch('http://localhost:4000/api/apply/'+key,{
      method: 'DELETE',
        headers:{'Authorization':`Bearer ${user.token}`}
        })
    setPending(false)
  }


  return (
    <div className='offer-details'>
   
      <p style={{cursor:'pointer'}} onClick={()=>navigate('/offer/'+offer._id)}>Title: {offer.title}</p>
        <p>Nombre de projets: {offer.offer_number}</p>
        <p>Posted at: {offer.createdAt}</p>
        <div className='del-edit'>
          {(user.user.capacity ==='Admin' || offer.user_id === user.user._id ) &&<>
        <button className='delete-bttn' onClick={handleClick}>Delete</button>
        <button className='edit-bttn' onClick={handleEdit}>Edit</button></>}
        {accepted? <button className='accepted-bttn' disabled={true}>Accepted</button>:
        <div>
         {!pending? user.user.capacity === 'Student' && <button className='apply-bttn' onClick={handleApply}>Apply</button>
        : <button className='cancel-bttn' onClick={handleCancel}>Cancel application</button>} 
          </div>}
        
        
        </div>
      
    </div>    

  )
}

export default OfferDetails