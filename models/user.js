const mongoose = require('mongoose')
const schema = mongoose.Schema

const user = new schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
       
    },
    address:{
        type:String
    },
    picture:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }

})
module.exports = mongoose.model('users', user)