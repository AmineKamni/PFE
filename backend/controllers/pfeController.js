const mongoose = require('mongoose')
const Pfeproject = require('../models/pfeModel')

const patchPfe = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such PFE'})
    }
    const update = await Pfeproject.findByIdAndUpdate({_id:id}, {...req.body})
    if (!update){
        return res.status(400).json("No such PFE")
    }
    res.status(200).json(update)
}

const getPfe = async (req,res) =>{
    try{
        const pfeInfo = await Pfeproject.aggregate([
            {
                $set:{
                user_id1: {
                    $toObjectId: "$user_id1"
                  },    
                }
            },
            {
                $lookup:{
                     from: 'users',
                     localField: 'user_id1',
                     foreignField: '_id',
                     as: 'pfeinfo'
                }
            }
        ])
        if (!pfeInfo){
            return res.status(400).json("No such pfe")
        }
        
        res.status(200).json(pfeInfo)}
        catch(error){
            res.status(400).json({error:'No such pfe'})}
    

}
const getPfeId = async (req,res) =>{
    const {id} = req.params 
    const pfe = await Pfeproject.find({user_id1:id})
    res.status(200).json(pfe)
}
const createPfe = async (req,res) =>{
    try{  
        const newPfe = await Pfeproject.create({...req.body})  
        res.status(200).json(newPfe)

    } catch(error){
        res.status(400).json({error: error.message})
    }
    
}

module.exports ={getPfe, createPfe, patchPfe, getPfeId}