import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import { saveAs } from 'file-saver';
import './Validation.css'
import DownloadIcon from '@mui/icons-material/Download';

const Validation = () => {
    const {user} = useAuthContext()
    const [acceptedUser, setAcceptedUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getValidApplications = async () => {
        const response = await fetch('http://localhost:4000/api/apply/valid',{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        console.log(json)
        const result = []
        json.forEach((obj)=>{
            result.push([obj.offer_id, obj.acceptedtrue[0]?.username , obj._id, obj.validated, obj.user_id])
        })
        setAcceptedUser(result)
        console.log(acceptedUser)
    }

    useEffect(()=>{
        if(user){
            getValidApplications() 
        }     
    },[])

    
    const handleClick = async (id) =>{
        const response = await fetch('http://localhost:4000/api/apply/'+id[0],{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({validated:true})
        })
        const notify = await fetch('http://localhost:4000/api/notifications/'+id[1],{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({notifications: {type:`${user.user.username} validated your application to the offer ${id[2]}`, source:user.user._id}})
          })
        
        const createpfe = await fetch('http://localhost:4000/api/pfe',{
            method: 'POST',
            body: JSON.stringify({user_id1: id[1], offer_id: id[2]}),
            headers: {'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
            
        })
        getValidApplications()
        
    }
    const generate = async()=>{
        setIsLoading(true)
        if(user){
            const post = await fetch('http://localhost:4000/api/pdf/valid',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
                }
            })
            if(post.ok){
                getPDF()
            } 
        }
    }
    const getPDF = async() =>{
        const response = await fetch('http://localhost:4000/api/pdf/valid',{
            method:'GET',
            headers:{
                'Content-Type': 'application/pdf',
                'Authorization':`Bearer ${user.token}`},

        })
        const result = await response.blob()
        saveAs(result, `ValidPFE.pdf`)
        setIsLoading(false)
    }
  return (
    <div className='validation-out'>
     <h1 className='page-title'>View & Validate applications</h1>
     <p>Applications accepted by enterprise</p>
     {isLoading? <div className="lds-ripple"><div></div><div></div></div>:  <button style={{display:'flex',alignItems:'center'}}  onClick={generate} className='apply-bttn'>Generate List <DownloadIcon/></button>}
    <div className='validation'>
       
        {acceptedUser.map((pair,i) =>(
            <div key={i} className='val-card'>
                <div>
                    <p>Student: {pair[1]}</p>
                    <p>Offer Id: {pair[0]}</p>
                    {pair[3]? <p id='validp'>Already validated</p> : <button className='apply-bttn' onClick={()=>{handleClick([pair[2], pair[4], pair[0]])}}>Validate</button>}
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Validation