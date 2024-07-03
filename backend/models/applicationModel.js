const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    offer_id:{
        type: String,
        

    },
    user_id:{
        type: String,
 
    },
    pending:{
        type:Boolean,
        default:false
    },
    accepted:{
        type:Boolean,
        default:false
    },
    validated:{
        type:Boolean,
        default:false
    }


}, {timestamps: true})

module.exports = mongoose.model('Application', applicationSchema)