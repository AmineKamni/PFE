import React, { useState, useEffect } from 'react'
import {useOffersContext} from '../hooks/useOffersContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import './OfferId.css'
const OfferId = () => {
    const location = useLocation()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [offer_number, setOffer_number] = useState('')
    const [start,setStart] =useState('')
    const [end, setEnd] = useState('')
    const [details, setDetails] = useState('')
    const [userId, setUserId] = useState('')
    const [run,setRun] = useState(false)
    const offerId = location.pathname.split("/")[2]
    const navigate = useNavigate()
    const [modify, setModify] = useState(false)


    useEffect(() =>{
        
        const fetchOffer = async() =>{
            const response = await fetch('http://localhost:4000/api/offers/'+offerId,
            {headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}})
            const json = await response.json()
            setTitle(json.title)
            setCompany(json.company)  
            setOffer_number(json.offer_number)
            setUserId(json.user_id)
            setStart(json.start.split('-')[0]+'-'+json.start.split('-')[1]+'-'+json.start.split('-')[2].substring(0,2))
            setEnd(json.end.split('-')[0]+'-'+json.end.split('-')[1]+'-'+json.end.split('-')[2].substring(0,2))
            setDetails(json.details)
            
            
        }
        if(user){
            const json =  fetchOffer()
            
            
        }
        

    },[run])
    const handleSave = async(e) =>{
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/offers/${offerId}`,{
          method: 'PATCH',
          headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
          body: JSON.stringify({title:title, company:company, offer_number:offer_number, start:start, end:end, details:details})
        })
        if(response.ok){
            const json = await response.json()
        }
        return navigate('/offer')
        
      }
      
  return (
    <div className='offer-create' >
        {modify?<h3 className='page-title'>Edit offer</h3>:<h3 className='page-title'>Offer Details</h3>}
        {modify? 
                <div>
                    <div className='offer-edit'>

                    <label>Offer title:</label>
                    <input 
                        type ='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}>
                    </input>
                    <label>Company:</label>
                    <input 
                        type ='text'
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}>
                    </input>
                    <label>Number of offers:</label>
                    <input 
                        type ='number'
                        onChange={(e) => setOffer_number(e.target.value)}
                        value={offer_number}>
                    </input>
                    <label>Start date:</label>
                    <input 
                        type ='date'
                        onChange={(e) => setStart(e.target.value)}
                        value={start}>
                    </input>
                    <label>End date:</label>
                    <input 
                        type ='date'
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}>
                    </input>
                    <label>Details:</label>
                    <textarea style={{height:'150px', border:'1px solid black', borderRadius:'10px', padding:'10px'}}
                        type ='text'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}>
                    </textarea>
                    </div>
                    <div className='offer-buttons'>
                        <button className='edit-bttn' onClick={handleSave}>Save</button>
                        <button className='delete-bttn' onClick={()=>{setModify(false)}}>Cancel</button>
                    </div>
                </div>
        :  
        <div>
            <div className='offer-edit'>
            <label>Offer title:</label>
                    <input readOnly
                        type ='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}>
                    </input>
                    <label>Company:</label>
                    <input readOnly
                        type ='text'
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}>
                    </input>
                    <label>Number of offers:</label>
                    <input readOnly
                        type ='number'
                        onChange={(e) => setOffer_number(e.target.value)}
                        value={offer_number}>
                    </input>
                    <label>Start date:</label>
                    <input readOnly
                        type ='date'
                        onChange={(e) => setStart(e.target.value)}
                        value={start}>
                    </input>
                    <label>End date:</label>
                    <input readOnly
                        type ='date'
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}>
                        
                    </input>
                    <label>Details:</label>
                    <textarea style={{height:'150px', border:'1px solid black', borderRadius:'10px', padding:'10px', marginBottom:'20px'}} readOnly
                        type ='text'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}>
                        
                    </textarea>
            </div>
            {(user.user.capacity === 'Admin' || userId === user.user._id ) &&<div className='offer-buttons'> <button className='edit-bttn' onClick={() =>setModify(true)}>Modify</button></div>}
        </div>
        }

    </div>
  )
}

export default OfferId