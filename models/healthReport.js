const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const healthReport = new Schema({
    user:[{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    username:{
        type: String,   
       }, 
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
               age:{
                   type:Number
               },
               sex:{
                   type:String
                   
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
    status:{
        type: String
    },
    attended:{
        type:String
    },
    media:{
        type:String
    },
    postedTime:{
        type:Date,
        default:new Date()
    }




})

module.exports = mongoose.model('healthReport', healthReport)