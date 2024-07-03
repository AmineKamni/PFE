import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import './Appointments.css'
const Appointments = () => {
    const {user} = useAuthContext()
    const fields = ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "SUD-Cloud&IoT"]
    const departments = ["EMOP","GLC","MIR","SC"]
    const [selection ,setSelection] = useState(['','','','','','',''])
    const [teachers, setTeachers] = useState([])
    const [chiefs, setChiefs] = useState([])
    const [isCoordinator,setIsCoordinator ]= useState([[false],[false],[false],[false],[false],[false],[false]])
    const [isChief, setIsChief] = useState([[false],[false],[false],[false]])
    const [selectionC, setSelectionC] = useState(['','','',''])
    const getUsers = async () =>{
        const userinfo = await fetch('http://localhost:4000/api/user',{ 
            method:'GET', 
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await userinfo.json()
        const listTeachers = []
        if(userinfo.ok){
            for(let i = 0; i < json.length; i++){
                if(json[i].capacity == "Teacher"){
                    listTeachers.push({username:json[i].username, id:json[i]._id})
                    if(json[i].coordinator){
                        isCoordinator[fields.indexOf(json[i].field)] = [json[i].username,json[i]._id]
                    }
                    if(json[i].deptChef){
                        isChief[departments.indexOf(json[i].department)] = [json[i].username, json[i]._id]
                    }
                }
            }
            setTeachers(listTeachers)
        }
    }

    useEffect(()=>{
        if(user){
            getUsers()
            console.log(teachers)
        }
    },[])
    const handleCoordinator = async (e) => {
        if(e.target.value!='Choose a teacher' && user){
            const index = e.target.value
            const respons = await fetch('http://localhost:4000/api/user/attributes/'+selection[index],{
                method: 'PATCH',
                headers:{'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({coordinator:true, field:fields[index]})  
            })
     
        }
    }
    const handleChief = async (e) => {
        console.log(selectionC)
        if(e.target.value!='Choose a teacher' && user){
            const index = e.target.value
            const respons = await fetch('http://localhost:4000/api/user/attributes/'+selectionC[index],{
                method: 'PATCH',
                headers:{'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({deptChef:true, department: departments[index]})  
            })
     
        }
    }
    const removeCoord = async (e) =>{
        if(user){
            const remove = await fetch('http://localhost:4000/api/user/attributes/'+isCoordinator[e.target.value][1],{
                method: 'PATCH',
                headers:{'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({coordinator:false})        
            })
        }
    }
    const removeChief = async (e) =>{
        if(user){
            const remove = await fetch('http://localhost:4000/api/user/attributes/'+isChief[e.target.value][1],{
                method: 'PATCH',
                headers:{'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({deptChef:false})        
            })
        }
    }
   
  return (
    <div className='appoint'>
        <div><h1 className='page-title'>Coordinator</h1>
        <div className='coordinator'>
        {fields.map((element, index) =>(
            <div className='select-teacher' key={element}>
                <p>Field : {fields[index]}</p>
                {(isCoordinator[index][0]==false)?
                <div className='secend-select'>
                    <select  onChange={(e)=>{selection[index] = e.target.value ; setSelection(selection)}}>
                    <option value={'Choose a teacher'}>Choose a teacher</option>
                    {teachers.map((teacher, i) =>(
                        <option key={i} value={teacher.id}> Pr. {teacher.username}</option>
                    ))}
                </select>
                <button className='apply-bttn' onClick={handleCoordinator} value={index}>Save</button>
                </div> 
                :
                <div> 
                    <p>Coordinator : {isCoordinator[index][0]}</p>
                    <button className='delete-bttn' onClick={removeCoord} value={index}>Remove</button>
                </div> 
                }
                
            </div>
        ))}
        </div>
        </div>
        <div><h1 className='page-title'>Department Chief</h1>
        <div className='chief'>
        {departments.map((element, index) =>(
            <div className='select-teacher' key={element}>
                <p>Departement : {departments[index]}</p>
                {(isChief[index][0]==false)?
                <div className='secend-select'>
                    <select  onChange={(e)=>{selectionC[index] = e.target.value ; setSelectionC(selectionC)}}>
                    <option value={'Choose a teacher'}>Choose a teacher</option>
                    {teachers.map((teacher, i) =>(
                        <option key={i} value={teacher.id}> Pr. {teacher.username}</option>
                    ))}
                </select>
                <button className='apply-bttn' onClick={handleChief} value={index}>Save</button>
                </div> 
                :
                <div> 
                    <p>Department chief : {isChief[index][0]}</p>
                    <button className='delete-bttn' onClick={removeChief} value={index}>Remove</button>
                </div> 
                }
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Appointments