const Users = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const Report = require('../models/reportModel')


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
const register = async(req,res) =>{
    const {username, email, password,capacity, field} = req.body
   try{
    const user = await Users.signup(username,email,password,capacity, field)
    const token = createToken(user._id)
    const report = await Report.create({_id:user._id})
    user.password='Hidden'
    res.status(200).json({email,capacity,token, user})
   }catch(error){
    res.status(400).json({error: error.message})
   }
    

    
}


const login = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await Users.login(email,password)
        const token = createToken(user._id)
        /*const json = delete JSON.stringify(user)[password]*/
        user.password='Hidden'
        res.status(200).json({email,token, user})
       }catch(error){
        res.status(400).json({error: error.message})
       }
}



module.exports = {register, login}