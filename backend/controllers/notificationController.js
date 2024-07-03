const Users = require('../models/usersModel')

const notificationPatch = async (req,res) =>{
    const {id} = req.params
    if( req.body.notifications!='No notification'){
        console.log(req.body.notifications)
        const notification = await Users.updateOne({_id:id}, {$push:{... req.body}})
        if (!notification){
            return res.status(400).json("No such user")
        }
        res.status(200).json(req.body.notifications)

    }else if(req.body.notifications="No notification"){
        console.log(req.body.notifications)
        const notification = await Users.findOneAndUpdate({_id:id}, {notifications: []})
        if (!notification){
            return res.status(400).json("No such user")
        }
        res.status(200).json(req.body.notifications)
    }
}

module.exports ={notificationPatch}