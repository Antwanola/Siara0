const mongoose =  require("mongoose")
const Schema = mongoose.Schema

const incident = new Schema({
    user:[{
        type: Schema.Types.ObjectId,
        ref:'users',
       
    }],
    
    name:{
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
    
    eResponse:{
        type: String,
        default: 'Yes'
        
    },
    eResponse_needed:{
        type: String,
        default: 'Yes'
        
    },
    anonymous:{
        type:Boolean
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

module.exports = mongoose.model('incident', incident)