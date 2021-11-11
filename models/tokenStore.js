const mongoose = require('mongoose')
const schema = mongoose.Schema

const newAuth = new schema({
   user:{
       type: Object,
   },
   token:{
       type: String
   },
   refreshToken:{
        type:String
   },
   createdTime:{
    type:Date,
    default:new Date()
}
})


module.exports = mongoose.model('tokenStore',newAuth)