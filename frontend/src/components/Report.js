import React, {useEffect, useState} from 'react'
import './Report.css'
import {useAuthContext} from '../hooks/useAuthContext'

const Report = () => {
  const [report, setReport]=useState('')
  const [finalReport, setFinalReport] = useState('')
  const [reports, setReports] = useState([])
  const [validated,setValidated] =useState(false)
  const [data, setData] = useState([])
  const { user}= useAuthContext()
  const [isLoading,setIsLoading] = useState(false)

  
  
  const fetchData = async () =>{
    setIsLoading(true)
    const info = await fetch('http://localhost:4000/api/report/'+user.user._id,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`}
    })
    const json = await info.json() 
      if(info.ok ){ 
        setIsLoading(false)
        setData(json) 
        setValidated(data.validated)
        setReports(data.reports)
      }

  }

  const handleFinalSend = async() =>{
   
    if(user && finalReport != ''){
      setIsLoading(true)
      const response = await fetch('http://localhost:4000/api/report/'+user.user._id, {
        method: 'PATCH',
        body: JSON.stringify({ finalReport:finalReport}),
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`
        }
    })
    if(response.ok){
      setIsLoading(false)
      if(user){
        fetchData() 
      }
    }  
    } 
  }
  const handleSend = async() =>{
    
    if(user && report !='' ){
      data.reports.push(report)
      setIsLoading(true)
      const response = await fetch('http://localhost:4000/api/report/'+user.user._id, {
        method: 'PATCH',
        body: JSON.stringify({reports:data.reports}),
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`
        }
    })
    if(response.ok){
      setIsLoading(false)
      if(user){
        fetchData() 
      }
    }
    } 
  }

    const handleRemove = async (e) =>{
      const index = e.target.value
      if(user){
        setIsLoading(true)
        const arrCopy = JSON.parse(JSON.stringify(data.reports))
        arrCopy.splice(index,1)
        setReports(arrCopy) 
        const remove = await fetch('http://localhost:4000/api/report/'+user.user._id,{
          method: 'PATCH',
          headers:{'Content-Type': 'application/json',
              'Authorization':`Bearer ${user.token}` },
          body: JSON.stringify({reports:arrCopy})
        })
        fetchData()
        setIsLoading(false)
      }
    }
    useEffect(()=>{
      if(user){
        fetchData()  
      }
    },[])
  return (
    <div className='center-report'>
    <h1 className='page-title'>Report Link</h1>
    <div className="report-container">
      <div className='reports'>
        <div className='report-top'>
          <label>Report</label>
          <input type="text" onChange={(e) =>setReport(e.target.value)} className="report-input" />
        
        <button onClick={handleSend} className="apply-bttn" disabled={isLoading}>Send</button>
        </div>
        <div className='reports-list'>
          <p>Reports :</p>
          { data.reports== []?<h2>No report</h2>
            :
            <ul>
            {data.reports?.map((rep,i) =>(
              <div className='reports-remove' key={i}>
                <li ><a href={rep}>{rep}</a></li><button  className='delete-bttn' value={i} onClick={handleRemove} disabled={isLoading}>Remove</button>
              </div>
            ))}
            </ul>
            }
          </div>

      </div>

      <div className='final-report'>
        <div className='report-top'>
          <label>Final Report</label>
          <input type="text" onChange={(e) =>setFinalReport(e.target.value)} className="report-input" />
        
        <button onClick={handleFinalSend} className="apply-bttn" disabled={isLoading}>
            Send
        </button></div>
    
    
    <hr/>
    <p>Final report : </p> 
      {data.finalReport==''? 
        ' Report not sent yet'
        :
        <div>
          <a href={data.finalReport}>{data.finalReport}</a>
          {validated?<button  className='accepted-bttn'>The final report is validated</button >
              :
              <p>The final report is not yet validated</p>
              }
        </div>
      }
      </div>
    </div>
    </div>
    
  )

}

export default Report
