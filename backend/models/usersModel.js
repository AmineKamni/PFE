const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    username:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    capacity:{
        type: String
    },
    field:{
        type: String
    },
    coordinator:{
        type: Boolean,
        default: false
    },
    verified:{
        type:Boolean,
        default: false
    },
    deptChef:{
        type:Boolean,
        default:false
    },
    department:{
        type:String
    },
    notifications:{
        type:Array,
        default:[]
    },
    cv:{
        type:String,
        default:''
    }
}, {timestamps: true})

usersSchema.statics.signup = async function(username,email,password,capacity, field) {
    if (validator.isEmpty(username)) {
        throw Error('Username must be filled')
       
    } 
    
    else if (!email || !password ){
        throw Error('All fields must be filled')
    }
    else if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    else if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }


    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already exists!')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({username,email,password:hash,capacity, field})
    return user
}


usersSchema.statics.login = async function(email, password){
    if (!email || !password ){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')

    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('Users', usersSchema)