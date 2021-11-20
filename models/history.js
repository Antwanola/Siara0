const mongoose = require('mongoose')
const Schema = mongoose.Schema

const history = new Schema({
    user: {
        type:Schema.Types.ObjectId
    },
    type:{
        type: String
    },
    report:{
        type: String
    },
    createdTime:{
        type:Date,
        default: new Date()
    }


})
  
  


module.exports = mongoose.model('history',history)