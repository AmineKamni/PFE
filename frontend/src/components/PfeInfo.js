import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import './PfeInfo.css'
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
const PfeInfo = () => {
    const {user} = useAuthContext()
    const [userId,  setUserId] = useState('')
    const fields = ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "SUD-Cloud&IoT"]
    const [student, setStudent] = useState('Choose a student')
    const [field, setField] = useState('Choose a field')
    const [modify, setModify] = useState(false)
    const [username, setUsername] = useState('......')
    const [offerID,setOfferID] = useState('......')
    const [encadrant,setEncadrant] = useState('......')
    const [departement,setDepartement] = useState('......')
    const [examinateur1,setExaminateur1] = useState('......')
    const [examinateur2,setExaminateur2] = useState('......')
    const [examinateur3,setExaminateur3] = useState('.....')
    const [soutenance,setSoutenance] = useState('......')
    const [evaluation,setEvaluation] = useState('......')
    const [binome, setBinome] = useState(false)
    const [user2, setUser2] = useState('')
    const [user2ID, setUser2ID] = useState('')
    const [studentList, setStudentList] =useState([])
    const [info,setInfo] =useState([])
    const [all,setAll] = useState([])
    const [pfeID, setPfeID] = useState('')
    const [authorized, setAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const getPfeInfo = async () =>{
        const response = await fetch('http://localhost:4000/api/pfe',{
            method: 'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        if(response.ok){
            const json = await response.json()
            setInfo(json)
            const list = []
            for(const st of json){
                list.push(st.pfeinfo[0].username)
            }
            setAll(list)
           
        }

     
    }
    useEffect(()=>{
        if(user){
        getPfeInfo()  
    }
    },[])


    const handleChange = async (e) =>{
        if(e.target.value == 'Choose a student'){setStudent('Choose a student')}else{
            setStudent(studentList[e.target.value])
            
        setModify(false)
        if(info != []){
            const index = all.indexOf(studentList[e.target.value])
            const obj = info[index]
            setUsername(obj.pfeinfo[0].username)
            setUserId(obj.pfeinfo[0]._id)
            setOfferID(obj.offer_id)
            setEncadrant(obj.encadrant)
            setDepartement(obj.departement)
            setExaminateur1(obj.examinateur1)
            setExaminateur2(obj.examinateur2)
            setExaminateur3(obj.examinateur3)
            setSoutenance(obj.soutenance)
            setEvaluation(obj.evaluation)
            setBinome(obj.binome)
            setUser2ID(obj.user_id2)
            setPfeID(obj._id)  
            setAuthorized(obj.authorized)
            if(obj.binome){
                const u2 = await fetch('http://localhost:4000/api/user/'+obj.user_id2,{
                    method: 'GET',
                    headers:{'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user.token}`}
                    })
                const student2 = await u2.json()
                setUser2(student2.username)
            }
            }
        }
        

    }
    const handleField = (e) =>{
        setStudentList([])
        setField(e.target.value)
        setStudent('Choose a student')
        const newlist = []
        if(info != [] ){
            info.forEach((obj)=>{
                if( obj.pfeinfo[0].field == e.target.value){
                    newlist.push(obj.pfeinfo[0].username) 
                }
        }) 
        } 
        setStudentList(newlist)
  
    }
    const handleModify = () =>{
        setModify(true)
    }
    const handleSave = async () =>{
        if(user){
            setModify(false)
            const save = await fetch('http://localhost:4000/api/pfe/'+pfeID,{
                method:'PATCH',
                headers:{'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`},
                body:JSON.stringify({encadrant:encadrant,departement:departement,
                    examinateur1:examinateur1,examinateur2:examinateur2,examinateur3:examinateur3,
                    soutenance:soutenance,evaluation:evaluation, binome:binome
                })
            }
            )   
        }
        setField("Choose a field")

    }
    const handleCancel = () =>{
        setModify(false)
        setField(field)
        setStudent('Choose a student')
        
        
    } 
    const generate = async () =>{
        setIsLoading(true)
        if(user){
            const post = await fetch('http://localhost:4000/api/pdf/'+userId,{
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
        const response = await fetch('http://localhost:4000/api/pdf/'+userId,{
            method:'GET',
            headers:{
                'Content-Type': 'application/pdf',
                'Authorization':`Bearer ${user.token}`},

        })
        const result = await response.blob()
        saveAs(result, `Convention_${student}.pdf`)
        setIsLoading(false)
    }
   const handleAuthorize = async() =>{
    if(user){
        setAuthorized(true)
        const save = await fetch('http://localhost:4000/api/pfe/'+pfeID,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            body:JSON.stringify({authorized:true})
        })   
        const notify = await fetch('http://localhost:4000/api/notifications/'+userId,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({notifications: {type:`${user.user.username} authorized your PFE defense`, source:user.user._id}})
          })
    }
   }
   const addBinome =async () =>{
    setBinome(true)
    const save = await fetch('http://localhost:4000/api/pfe/'+pfeID,{
        method:'PATCH',
        headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
        body:JSON.stringify({user_id2:user2ID, binome:true})
    }) 
   }
   const removeBinome =async () =>{
    setBinome(false)
    const save = await fetch('http://localhost:4000/api/pfe/'+pfeID,{
        method:'PATCH',
        headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
        body:JSON.stringify({binome:false})
    }) 
   }
  return (
    <div className='pfe-container'>
        
        <div className='pfe-choice'>
        <h1 className='page-title'>PFE Information</h1>
        <div className='pfe-field'>
            <p>Field : </p>
        <select className='pfe-select'  onChange={handleField}>
            <option  >Choose a field</option>
            {fields.map((el,i) =>(
                <option key={i} value={el}>{el}</option>
            ))}
        </select>
        </div>
        {!(field == 'Choose a field')? 
        <div>
            <div className='pfe-student'>
                <p>Student :</p>
        <select className='pfe-select'  onChange={handleChange} >
            <option >Choose a student</option>
            {studentList.map((el,i) =>(
                <option key={i} value={i}>{el}</option>
            ))}
        </select> 
        </div>
        {!(student == 'Choose a student')? 
        <div>

        <h2 className='pfe-info'>Information of : {student}</h2>
            {!modify? 
                <div>
                    <form className='pfe-form'>
                        <div className='pfe-cell'>
                        <label>Student :</label>
                        <input placeholder={username} readOnly></input>
                        </div>
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
                        {binome && <div className='pfe-cell'>
                        <label>Binome :</label>
                        <input placeholder={user2} readOnly></input>
                        </div>}
                    </form>
                    <div className='pfe-edit'>
                    <button className='edit-bttn' onClick={handleModify} >Modify</button>
                    {!authorized?<button onClick={handleAuthorize} className='apply-bttn'>Authorize</button>:<button className='accepted-bttn'>Authorized</button>}
                    {isLoading?<div class="lds-ripple"><div></div><div></div></div>:<button className='edit-bttn'style={{display:'flex',alignItems:'center'}} onClick={generate} >Generate Convention <DownloadIcon/></button>}
                    </div>
                </div>
                :
                <div>
                    <form className='pfe-form'>
                        <div className='pfe-cell'>
                        <label>Student :</label>
                        <input placeholder={username} readOnly></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>OfferID :</label>
                        <input placeholder={offerID} readOnly></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Encadrant :</label>
                        <input placeholder={encadrant} onChange={(e)=>{setEncadrant(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Department :</label>
                        <input placeholder={departement} onChange={(e)=>{setDepartement(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Examinateur 1 :</label>
                        <input placeholder={examinateur1} onChange={(e)=>{setExaminateur1(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Examinateur 2 :</label>
                        <input placeholder={examinateur2} onChange={(e)=>{setExaminateur2(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Examinateur 3 :</label>
                        <input placeholder={examinateur3} onChange={(e)=>{setExaminateur3(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Soutenance Date :</label>
                        <input placeholder={soutenance} type='datetime-local' onChange={(e)=>{setSoutenance(e.target.value)}}></input>
                        </div>
                        <div className='pfe-cell'>
                        <label>Evaluation :</label>
                        <input placeholder={evaluation} onChange={(e)=>{setEvaluation(e.target.value)}}></input>
                        </div>
                        {binome? 
                            <div className='pfe-cell'>
                                <label>Binome :</label> 
                                <input placeholder={user2} readOnly></input>
                                <button onClick={removeBinome} className='delete-bttn'>Remove</button>
                            </div> 
                        : 
                            <div className='pfe-cell'>
                                <input placeholder='Student ID' onChange={(e)=>{setUser2ID(e.target.value)}}></input>
                                <button onClick={addBinome} className='apply-bttn'>Add</button>
                            </div>
                            }
                        
                    </form>
                    <div className='pfe-edit'>
                    <button className='edit-bttn' onClick={handleSave}  >Save</button> 
                    <button className='delete-bttn' onClick={handleCancel} >Cancel</button> 
                    </div>
                </div>
            }
            
        </div>
        :
        <h2 className='pfe-info'>Please choose a student</h2>
        }

        </div>
        
        :
        <div><h2 className='pfe-info'>Needs field</h2></div>}
        
        </div>
        
    </div>
  )
}

export default PfeInfo