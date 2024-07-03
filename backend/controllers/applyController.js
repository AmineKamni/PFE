const mongoose = require('mongoose')
const Application = require('../models/applicationModel')


const application = async (req,res) =>{
    const {user_id, offer_id} = req.body
    try{
        const newApplication = await Application.create({user_id,offer_id, pending:true})
        res.status(200).json(newApplication)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}
const cancelApplication = async (req,res) =>{
    const {id} =req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such application'})
    }
    const application = await Application.findOneAndDelete({_id: id})
    if (!application){
        return res.status(400).json("No such application")
    }
    res.status(200).json(application)

}
const getApplications = async(req,res) =>{
    try{    const applications = await Application.find().sort({createdAt :-1})
    res.status(200).json(applications)}catch(error){res.status(400).json('No application')}

}
const getPending = async(req,res) =>{
    const user_id = req.params['id']
    try{
        const applicant =[]
    const result = await Application.aggregate([
    
          {
            $set: {
            offer_id: {
                $toObjectId: "$offer_id"
              },
              
            }
          },
        { $lookup:
           {
             from: 'offers',
             localField: 'offer_id',
             foreignField: '_id',
             as: 'pendingapp'
           }

           
         }
         
         /*        {
            $addFields: {
              offer_idObj: { $toObjectId: '$offer_id' }
            }
          },, 
         { 
             $project:
             {
                
                 pendingap:{'user_id':'$user_id', 'offer_id':'$offer_id'}
             }
         } */
        ])
        // check if user_id exists in pending app objects, meaning user receives application
    result.forEach((obj) =>{
        if(obj.pendingapp[0].user_id==user_id){
            applicant.push({applicant_id:obj.user_id, offer_id:obj.offer_id.toString(), application_id:obj._id})
        }
        
    })

    res.status(200).json({applicant})
    }catch(error){res.status(400).json({error: 'No such application'})}
    
    
    
}
const patchApplication = async(req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such application'})}
    const application = await Application.findByIdAndUpdate({_id: id},{...req.body})
    if (!application){
        return res.status(400).json("No such application")
    }
    res.status(200).json(application)
}
const getSingleApplication = async(req,res) =>{
    const{id} = req.params


    if (id == 'valid'){
        const valid = await Application.aggregate([
            { $match:{"accepted" : true}},
            {
                $set: {
                user_id: {
                    $toObjectId: "$user_id"
                  },
                  
                }
              },
            {
                $lookup:
               {
                 from: 'users',
                 localField: 'user_id',
                 foreignField: '_id',
                 as: 'acceptedtrue'
               }
            }
        ])
        res.status(200).json(valid)
    }else{
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such application'})}
        const application = await Application.findById(id)
        if (!application){
            return res.status(400).json("No such application")
        }
        
        res.status(200).json(application)
    }




}
const getValid = async (req,res) =>{

}
module.exports ={application, cancelApplication, getApplications, getPending, patchApplication,getSingleApplication, getValid}