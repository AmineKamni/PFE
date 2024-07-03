const mongoose = require('mongoose')
const Users = require('../models/usersModel')

const bcrypt = require('bcrypt')
const validator = require('validator')
const getUser = async (req,res) =>{
    const users = await Users.find().sort({createdAt :-1})
    res.status(200).json(users)

}
const getUserById = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }
    const user = await Users.findById(id)
    if(!user){
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}
const deleteUser = async(req,res) =>{

    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }
    const users = await Users.findOneAndDelete({_id: id})
    if (!users){
        return res.status(400).json("No such user")
    }
    res.status(200).json(users)
}
const updateUser = async(req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }
    const {username:username, email:email, password:password, cv:cv} = { ... req.body}
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    else if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await Users.findOneAndUpdate({_id:id},{ ...req.body, password:hash})
    if (!user){
        return res.status(400).json("No such user")
    }
    res.status(200).json(user)
}
const updateAttributes = async(req,res) =>{
    const{id} = req.params
    const user = await Users.findOneAndUpdate({_id:id}, {... req.body})
    if (!user){
        return res.status(400).json("No such user")
    }
    res.status(200).json(user)
    
}
module.exports ={getUser, deleteUser, getUserById, updateUser, updateAttributes}