import React, { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import './Home.css'
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate} from 'react-router-dom'
const Home = () => {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const fields = ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "SUD-Cloud&IoT"]
    const [stats, setStats] = useState({students:[0,0,0,0,0,0,0], pending: [0,0,0,0,0,0,0], accepted:[0,0,0,0,0,0,0], validated:[0,0,0,0,0,0,0], teachers:0, enterprises:0, offers:0})
    const getStats = async () =>{
        const  result = await fetch('http://localhost:4000/api/dash',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`},
            method:'GET'
        })
        const json = await result.json()
        setStats(json)
      
    }
    useEffect(()=>{
        if(user){
            getStats()
            console.log(stats)
        }
    },[])
    const data1 = [
        { label: 'Pending', value: stats.pending.reduce((a,b)=>a+b) },
        { label: 'Accepted', value: stats.accepted.reduce((a,b)=>a+b) },
        { label: 'Validated', value: stats.validated.reduce((a,b)=>a+b) }
      ];
      const data2 = [
        { label: 'Pending ASEDS', value: stats.pending[0] },
        { label: 'Pending AMOA', value: stats.pending[1] },
        { label: 'Pending DATA', value: stats.pending[2] },
        { label: 'Pending ICCN', value: stats.pending[3] },
        { label: 'Pending SESNum', value: stats.pending[4] },
        { label: 'Pending SmartICT', value: stats.pending[5] },
        { label: 'Pending SUD-Cloud&IoT', value: stats.pending[6] },
        { label: 'Accepted ASEDS', value: stats.accepted[0]},
        { label: 'Accepted AMOA', value: stats.accepted[1]},
        { label: 'Accepted DATA', value: stats.accepted[2]},
        { label: 'Accepted ICCN', value: stats.accepted[3]},
        { label: 'Accepted SESNum', value: stats.accepted[4]},
        { label: 'Accepted SmartICT', value: stats.accepted[5]},
        { label: 'Accepted SUD-Cloud&IoT', value: stats.accepted[6]},
        { label: 'Validated ASEDS', value: stats.validated[0]},
        { label: 'Validated AMOA', value: stats.validated[1]},
        { label: 'Validated DATA', value: stats.validated[2]},
        { label: 'Validated ICCN', value: stats.validated[3]},
        { label: 'Validated SESNum', value: stats.validated[4]},
        { label: 'Validated SmartICT', value: stats.validated[5]},
        { label: 'Validated SUD-Cloud&IoT', value: stats.validated[6]}
      ];
    return(
        // <h1 className='page-title'>Dashboard</h1>
        <div className='dashboard'>
           <h1 className='page-title'>Dashboard</h1>
            <div className='dash-info'>
                <div className='enterprise-stats'>
                    <p>Number of Enterprises </p> <BusinessIcon />
                    <p style={{marginLeft:'30px', fontSize:'20px', color:'blue'}}>{stats.enterprises}</p>
                    <p id='goto-stats' onClick={()=>navigate('/users')} >&gt;</p>
                </div>
                <div className='offer-stats'>
                    <p>Number of Offers</p> <CampaignIcon/>
                    <p style={{marginLeft:'30px', fontSize:'20px', color:'blue'}}>{stats.offers}</p>
                    <p id='goto-stats' onClick={()=>navigate('/offer')} >&gt;</p>
                </div>
                <div className='offer-stats'>
                    <p>Number of Students</p> <PeopleIcon/>
                    <p style={{marginLeft:'30px', fontSize:'20px', color:'blue'}}>{stats.students.reduce((a,b)=>a+b)}</p>
                    <p id='goto-stats' onClick={()=>navigate('/users')} >&gt;</p>
                </div>
                <div className='offer-stats'>
                    <p>Number of Teachers</p> <PeopleIcon/>
                    <p style={{marginLeft:'30px', fontSize:'20px', color:'blue'}}>{stats.teachers}</p>
                    <p id='goto-stats' onClick={()=>navigate('/users')} >&gt;</p>
                </div>
            </div>
            <div className='charts'>
                <div className='bar-chart'>
                    <p>Students on the platform:</p>
                <BarChart
                    xAxis={[
                        {
                        id: 'barCategories',
                        data: ["ASEDS", "AMOA", "DATA", "ICCN", "SESNum", "SmartICT", "Cloud&IoT"],
                        scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                        data: [stats.students[0], stats.students[1], stats.students[2], stats.students[3], stats.students[4], stats.students[5], stats.students[6]],
                        },
                    ]}
                    width={600}
                    height={300}
                    />
                </div>
                <div className='pie-chart'>
                    <p>Status of students:</p>
                <PieChart
                    series={[
                        {
                            innerRadius: 0,
                            outerRadius: 80,
                            data:data1
                        },
                        {
                            innerRadius: 100,
                            outerRadius: 120,
                            data: data2,
                        },
                    ]}
                    width={400}
                    height={300}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                    />
                </div>
            </div>
        </div>
        
        
    )
}

export default Home