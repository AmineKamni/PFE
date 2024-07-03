import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import AppMini from './AppMini'
import './Applications.css'
const Applications = () => {
    const {user} = useAuthContext()
    const [pairs, setPairs] = useState([])
    const [empty, setEmpty] =useState(true)

    const findApplications = async() =>{
        const applications = await fetch('http://localhost:4000/api/apply/pending/'+user.user._id,{
            method:'GET',
            headers:{'Authorization':`Bearer ${user.token}`},
            
        })
        const result = await applications.json()
        console.log(result)
        setPairs(result.applicant)
        setEmpty(result.applicant.length===0)
    }
    useEffect(()=>{
        if(user){
            findApplications()
        }
    },[])


  return (
    <div className='applications'>
    {empty? 
    <div>
        <h2 className='page-title'>No application yet</h2>
    </div  >
    :<>
        <h2 className='page-title'>Current applications:</h2>
    <div className='tocenter'>
        {pairs && pairs.map((obj,i) =>(
            
                <AppMini key = {i}
                 prop={{applicant_id:obj.applicant_id,offer_id:obj.offer_id, application_id:obj.application_id}} ></AppMini>
            
        ))}
    </div>
    </>
    }
    </div>
  )
}

export default Applications