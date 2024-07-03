const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pfeSchema = new Schema({
    user_id1:{
        type: String,
        

    },
    user_id2:{
        type: String,
 
    },
    binome:{
        type:Boolean,
        default:false
    },
    encadrant:{
        type: String
    },
    offer_id:{
        type:String
    },
    departement:{
        type: String
    },
    examinateur1:{
        type: String
    },
    examinateur2:{
        type: String
    },
    examinateur3:{
        type: String
    },
    soutenance:{
        type: Date
    },
    evaluation:{
        type:String
    },
    authorized:{
        type:Boolean,
        default: false
    }


}, {timestamps: true})

module.exports = mongoose.model('Pfeproject', pfeSchema)