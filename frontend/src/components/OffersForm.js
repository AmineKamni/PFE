import React, { useState } from 'react'
import {useOffersContext} from '../hooks/useOffersContext'
import {useAuthContext} from '../hooks/useAuthContext'
import './OffersForm.css'
import { useNavigate } from 'react-router-dom'

const OffersForm = () => {
    const {dispatch} = useOffersContext()
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [offer_number, setOffer_number] = useState('')
    const [start,setStart] =useState('')
    const [end, setEnd] = useState('')
    const [details, setDetails] = useState('')
    const [error, setError] = useState(null)
    const { user}= useAuthContext()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }

        const offers = {user_id: user.user._id,title:title, company:company, offer_number:offer_number, start:start, end:end, details:details}
        console.log(offers)
        const response = await fetch('http://localhost:4000/api/offers', {
            method: 'POST',
            body: JSON.stringify(offers),
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setCompany('')
            setOffer_number('')
            setError(null)
            dispatch({type: 'CREATE_OFFERS',payload: json})
            navigate('/offer')
        }
    }
  return (
    <div className='form-creation'>
    <h3 className='page-title'>Add a new offer</h3>
    <form id='offerform' className='create' onSubmit={handleSubmit}>

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
        
       
    </form>
    <div id='middle-btn' > <button className='apply-bttn' type='submit' form='offerform'>Add offer</button></div>
    </div>
  )
}

export default OffersForm