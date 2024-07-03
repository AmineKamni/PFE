import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

const PfeInfoId = () => {
    const {user} = useAuthContext()
    const [offerID,setOfferID] = useState('......')
    const [encadrant,setEncadrant] = useState('......')
    const [departement,setDepartement] = useState('......')
    const [examinateur1,setExaminateur1] = useState('......')
    const [examinateur2,setExaminateur2] = useState('......')
    const [examinateur3,setExaminateur3] = useState('.....')
    const [soutenance,setSoutenance] = useState('......')
    const [evaluation,setEvaluation] = useState('......')
    const [isLoading,setIsLoading] =useState(false)
    const [authorized, setAuthorized] = useState(false)
    const getPfeInfo = async () =>{
        const response = await fetch('http://localhost:4000/api/pfe/'+user.user._id,{
            method: 'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        if(response.ok){
            const json = await response.json()
            setOfferID(json[0].offer_id)
            setEncadrant(json[0].encadrant)
            setDepartement(json[0].departement)
            setExaminateur1(json[0].examinateur1)
            setExaminateur2(json[0].examinateur2)
            setExaminateur3(json[0].examinateur3)
            setSoutenance(json[0].soutenance)
            setEvaluation(json[0].evaluation)
            setAuthorized(json[0].authorized)
        }
    }
    const generate = async () =>{
        setIsLoading(true)
        if(user){
            const post = await fetch('http://localhost:4000/api/pdf/'+user.user._id,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({offer_id:offerID})
            })
            if(post.ok){
                getPDF()
            } 
        }
    }
    const getPDF = async() =>{
        const response = await fetch('http://localhost:4000/api/pdf/'+user.user._id,{
            method:'GET',
            headers:{
                'Content-Type': 'application/pdf',
                'Authorization':`Bearer ${user.token}`},

        })
        const result = await response.blob()
        saveAs(result, `Convention_${user.user.username}.pdf`)
        setIsLoading(false)
    }
    useEffect(()=>{
        if(user){
        getPfeInfo()  
    }
    },[])

  return (
    <div className='pfe-container'>
        <h1 className='page-title'>PFE Information</h1>
        <h2 className='pfe-info'>Student : {user.user.username}</h2>
                <form className='pfe-form'>
                    <div className='pfe-cell'>
                    <label>OfferID :</label>
                    <input placeholder={offerID} readOnly></input>
                    </div>
                     <div className='pfe-cell'>
                    <label>Encadrant :</label>
                    <input placeholder={encadrant} readOnly></input>
                    </div>
                     <div className='pfe-cell'>
                    <label>Department :</label>
                    <input placeholder={departement} readOnly></input>
                    </div>
                     <div className='pfe-cell'>
                    <label>Examinateur 1 :</label>
                    <input placeholder={examinateur1} readOnly></input>
                    </div>
                     <div className='pfe-cell'>
                    <label>Examinateur 2 :</label>
                    <input placeholder={examinateur2} readOnly></input>
                    </div>
                    <div className='pfe-cell'>
                    <label>Examinateur 3 :</label>
                    <input placeholder={examinateur3} readOnly></input>
                    </div>
                     <div className='pfe-cell'>
                    <label>Soutenance Date :</label>
                    <input placeholder={soutenance} readOnly></input>
                    </div>
                    <div className='pfe-cell'>
                    <label>Evaluation :</label>
                    <input placeholder={evaluation} readOnly></input>
                    </div>
                </form>  
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                {isLoading?<div class="lds-ripple"><div></div><div></div></div>:<button className='edit-bttn'style={{display:'flex',alignItems:'center'}} onClick={generate} >Generate Convention <DownloadIcon/></button>}

                {!authorized?<p style={{width:'200px'}}>Not yet authorized</p>:<button className='accepted-bttn'>Authorized to defend PFE</button>}
                </div>
    </div>
  )
}

export default PfeInfoId