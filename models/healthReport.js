const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const healthReport = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
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
    }




})

module.exports = mongoose.model('Health Report', healthReport)