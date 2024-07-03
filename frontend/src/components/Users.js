import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import './Users.css'

const Users = () => {
    const {user} = useAuthContext()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const columns=[
        {
            name: 'ID',
            selector: (row) => row._id,
            omit: true
        },
        {
            name: "Username",
            selector: (row) => row.username,
            sortable: true,
            cell: (row) => <Link  className='select-user' to={`/profile/${row._id}`} >{row.username}</Link>
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
            
        },
        {   
            name: "Delete",
            cell: (row, id) => <button className='delete-bttn'onClick={(e)=>{(handleDelete(row._id)); e.stopPropagation()}} >Delete</button>
        },
        {
            name: 'Edit',
            
            cell: (row,id) => <button className='edit-bttn'onClick={(e)=>{(handleEdit(row._id)); e.stopPropagation()}} >Edit</button>
        }
    ]
    const handleDelete = async (prop) =>{
        const response = await fetch('http://localhost:4000/api/user/'+prop,{
            method: "DELETE",
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
    if(response.ok){
        return json
    }
    }
    const navigate = useNavigate()
    const handleEdit = (prop) =>{
        const path = `/profile/${prop}`
        navigate(path)
    }

    useEffect(() =>{
        const fetchTableData = async () =>{
            setLoading(true)
            const response = await fetch('http://localhost:4000/api/user',
                {method:'GET',headers:{'Authorization':`Bearer ${user.token}`}}
            )
            const data= await response.json()
            setData(data)
            setLoading(false)
           
            
        }
        if(user){
            fetchTableData()
            console.log('here')
        }
            
    },[])
    
    
  return (
    <div className='outer'>
    <div className='user'>
        
        <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
    
        
      />
    </div>
    </div>
    

  )
}

export default Users