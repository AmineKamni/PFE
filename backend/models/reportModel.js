const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    finalReport:{
        type: String,
        default: ''

    },
    user_id:{
        type: String,
 
    },
    validated:{
        type:Boolean,
        default:false
    },
    remark:{
        type:Array
    },
    reports:{
        type:Array,
        default: []
    }


}, {timestamps: true})

module.exports = mongoose.model('Report', reportSchema)