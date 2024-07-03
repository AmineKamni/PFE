const mongoose = require('mongoose')
const Report = require('../models/reportModel')
const Users = require('../models/usersModel')
const getReports = async(req,res) =>{
    const reports = await Users.aggregate([
        {
            $lookup:{
                from: 'reports',
                localField: '_id',
                foreignField: '_id',
                as: 'report'
            }
        }
    ])
    if(!reports){
        return res.status(400).json('Error at Report join Users')
    }
    res.status(200).json(reports)
}
const getReport = async(req,res) =>{
    const {id} =req.params
    try{
        const report = await Report.findById(id)
        res.status(200).json(report)
    }catch(error){
        res.status(400).json("No such report")
    }
  
   

}

const createReport = async(req,res) =>{
    const {id} = req.params
    try{
        const report = await Report.create({_id:id, ...req.body})
        res.status(200).json(report)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateReport = async (req,res) =>{
    const {id} = req.params
    const report = await Report.findByIdAndUpdate({_id:id},{ ...req.body})
    if (!report){
        return res.status(400).json("No such report")
    }
    res.status(200).json(report)

}
module.exports ={getReport,createReport, updateReport,getReports}