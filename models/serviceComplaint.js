const mongoose =  require('mongoose')
const Schema = mongoose.Schema


const serviceComplaint = new Schema({
    user:[{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],

 name:{
    type: String,   
   }, 
   phone:{
       type:String,
       
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
service_description:{
     type:String
    },
complaint_narration:{
        type:String,
        
    },
    provider_name:{
            type:String,
            
           },

agreement_detail:{
    type:String,
    
},

complaint_evidence:{
    type:String
}, 
service_feedback:{
    type:String,
},
anonymous:{
    type:String,
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

module.exports = mongoose.model('serviceComplaint',  serviceComplaint)