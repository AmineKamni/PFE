const mongoose = require('mongoose')

const Schema = mongoose.Schema

const offersSchema = new Schema({
    title:{
        type: String,
        required: true

    },
    company:{
        type: String,
        required: true
    },
    offer_number:{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    start:{
        type:Date,
        default: '2020-02-02'
    },
    end:{
        type:Date,
        default: '2020-02-02'
    },
    details:{
        type:String
    }
}, {timestamps: true})

module.exports = mongoose.model('Offers', offersSchema)