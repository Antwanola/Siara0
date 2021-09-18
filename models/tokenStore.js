const mongoose = require('mongoose')
const schema = mongoose.Schema

const newAuth = new schema({
    payload:{
        

    },
    token:'',
    refreshToken:''
})


module.exports = mongoose.model('tokenStore',newAuth)