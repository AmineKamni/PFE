import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import './ViewReport.css'

const ViewReport = () => {
    const fields =  ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "SUD-Cloud&IoT"]
    const {user} = useAuthContext()
    const [data,setData] = useState([])
    const [reports,setReports] = useState([])
    const [finalReport, setFinalReport] = useState('')
    const [studentList,setStudentList] = useState([])
    const [student, setStudent] = useState('')
    const [studentId, setStudentId] = useState('')
    const [validated, setValidated] = useState(false)
    const [remark, setRemark] = useState([])
    const [add, setAdd] = useState(false)
    const [summ, setSumm] = useState('')
    const addSummary = async() =>{
        remark.push(summ)
        setAdd(!add)
        const response = await fetch('http://localhost:4000/api/report/'+studentId,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            body:JSON.stringify({remark:remark})
        })
        
      }
      const deleteSummary = async() =>{
        const arrCopy = JSON.parse(JSON.stringify(remark))
        arrCopy.splice(-1,1)
        setRemark(arrCopy)
        console.log(remark)
        const response = await fetch('http://localhost:4000/api/report/'+studentId,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            body:JSON.stringify({remark:arrCopy})
        })
        
      }
    const getReports = async()=>{
        const response = await fetch('http://localhost:4000/api/report',{
            method: 'GET',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        setData(json)
        const list = []
        for(const obj of json){
            list.push(obj.username)
            
        }
        /*json.forEach((obj)=>{list.push(obj.username)})*/
        setStudentList(list)
        
    }
    useEffect(()=>{
        if(user){
            getReports()
        }
    },[])
    const handleSelection = (e) =>{
        if(e.target.value!='Slect Student'){
            if(data[e.target.value].report[0]?.reports){
                setReports(data[e.target.value].report[0].reports)
                setFinalReport(data[e.target.value].report[0].finalReport)
                setStudent(studentList[e.target.value])
                setStudentId(data[e.target.value]._id)
                setValidated(data[e.target.value].report[0].validated)
                setRemark(data[e.target.value].report[0].remark)
              
            }else{
                setReports([])
                setFinalReport('')
                setStudent(studentList[e.target.value])
            }
        }else{
            setStudent('')
        }
        
    }
    const handleValidate = async() =>{
        if(user){
          const valid = await fetch('http://localhost:4000/api/report/'+studentId,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}` },
            body: JSON.stringify({validated:true})
          })
          const notify = await fetch('http://localhost:4000/api/notifications/'+studentId,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({notifications: {type:`${user.user.username} validated your final report`, source:user.user._id}})
          })
          if(valid.ok){
            setValidated(true)
          }
        }
      }
      
  return (
    <div className='rview'>
        <h2 className='page-title'>Available Reports:</h2>
        <select className='rview-select' onChange={handleSelection}>
                <option>Slect Student</option>
            {studentList.map((st,i)=>(
                <option key={i} value={i}>{st}</option>
            ))}
         </select>
            {student == ''? <h2>Student not choosen yet</h2>
            :
            <div className='rview-data'>
                {finalReport==''?<h3 className='rview-info'>Final report not submitted</h3>
                :
                <div className='final-report'>
                    <h3  className='rview-info'>Final report link :</h3>
                    <p className='rview-info'><a href={finalReport}>{finalReport}</a> </p> 
                    {validated?<button   className='accepted-bttn' >Validated</button>:<button onClick={handleValidate}  className="apply-bttn" >Validate</button>}
                </div>}
            {reports==[]?<p className='rview-info'>No partial report</p>:
                <div className='final-report'>
                    <h3 className='rview-info'>Partial reports:</h3>
                    {reports.map((rep,i)=>(<p className='rview-info' key={i}><a href={rep}>{rep}</a></p >))}
                </div>
            }
            {!add? <div className='final-report' ><button className='apply-bttn' onClick={()=>setAdd(!add)}>Add summary report</button></div>:
            <div className='final-report'>
                <textarea onChange={(e)=>setSumm(e.target.value)} style={{height:'150px', width:'300px', border:'1px solid black', borderRadius:'10px', padding:'10px'}}
            type ='text' ></textarea>
                <button className='apply-bttn' onClick={addSummary}>Add</button>
            </div>
            }
            
            {remark.length===0?<p className='rview-info'>No summary report</p>:
            <div className='final-report'>
                <h3 className='rview-info'>Compte rendu:</h3>
                <ol id='ol-report' >
                {remark.map((rem,i)=>(<li id='li-report' key={i}><textarea readOnly value={rem} style={{height:'50px', width:'300px', border:'none', borderRadius:'10px', padding:'10px', margin:'5px'}}></textarea  ></li>))}
                </ol>
                <button className='delete-bttn' onClick={deleteSummary}>Delete</button> 
            </div>
            }
            
            </div>
            }
            
       
    </div>
  )
}

export default ViewReport