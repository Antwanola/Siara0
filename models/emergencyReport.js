const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const emergency = new Schema({
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
        
    }



})

module.exports = mongoose.model('Emergency Report', emergency)