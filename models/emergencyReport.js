const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const emergency = new Schema({
    user:[{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
       phone:{
           type:String
       },
       state:{
        type:String,
        
       },
       lga:{
        type:String,
        
        
       },
       street:{
        type:String,
        
       },       
    date:{
        type:String,
        },
    time:{
         type: String,
        },
pOccurence:{
         type:String
        },
    pOccurence_detail:{
                type:String,
                
               },
    
    eResponse:{
        type:String,
        
    },
    eResponse_needed:{
        type:String,
        
    },
    anonymous:{
        type:String
    }, 
    report:{
        type:String,
        
    },
    attended:{
        type:String,
    },
    postedTime:{
        type:Date,
        default:new Date()
    }



})

module.exports = mongoose.model('emergencyReport', emergency)