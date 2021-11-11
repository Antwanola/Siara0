const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const accident = new Schema({
    user:[{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    name:{
        type: String,   
       }, 
       phone:{
           type:String
       },
       state:{
        type:String,
        required:true
       },
       lga:{
        type:String,
        required:true
        
       },
       street:{
        type:String,
        required:true
       },       
    date:{
        type:String,
        },
    time:{
         type: String,
        },
    
    eResponse:{
        type:String,
        
    },
    eResponse_needed:{
        type:String,
        
    },
    anonymous:{
        type:Boolean
    }, 
    report:{
        type:String,
        required:true
    },
     status:{
        type: String
<<<<<<< HEAD
    },
    attended:{
        type:String
    },
    postedTime:{
        type:Date,
        default:new Date()
=======
>>>>>>> b012c2a30d1f81c846e4bff9564c7756c8998261
    }



})

module.exports = mongoose.model('accident', accident)