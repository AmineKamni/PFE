import React, { useEffect  } from 'react'
import {useAuthContext} from '../hooks/useAuthContext.js'
import OfferDetails from './OfferDetails.js'
import {useOffersContext} from '../hooks/useOffersContext'
import './Offer.css'
const Offer = () => {
    const {offers, dispatch} = useOffersContext()
    const {user} = useAuthContext()
    useEffect(() => {

        const fetchOffers = async() =>{
            const response = await fetch('http://localhost:4000/api/offers',
            {headers:{'Authorization':`Bearer ${user.token}`}})
            const json = await response.json()
            if (response.ok){
                dispatch({type: 'SET_OFFERS', payload:json})
            }
        }
        if(user){
            fetchOffers()
            
        }

    },[dispatch, user])
  return (
    <div className='offer-home'>
        <h1 className='page-title'>Available Offers</h1>
        <div className='offers'>
   
            {offers && offers.map((offer) => (
                <OfferDetails key={offer._id} offer={offer}></OfferDetails>
            ))}
        </div>
        
   
    </div>
  )
}

export default Offer