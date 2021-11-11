const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name:{
        type:String,
         required: true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
       
    },
    address:{
        type:String
    },
    picture:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    },
    createdTime:{
        type:Date,
        default:new Date()
    }, 
accident:[{        
            type:Schema.Types.ObjectId,
            ref: 'accident',
                   
    }],
emergencyReport:[{        
        type:Schema.Types.ObjectId,
        ref: 'emergencyReport',
               
}],
environmentalReport:[{        
    type:Schema.Types.ObjectId,
    ref: 'environmentalReport',
           
}],
healthReport:[{        
    type:Schema.Types.ObjectId,
    ref: 'healthReport',
           
}],
incident:[{        
    type:Schema.Types.ObjectId,
    ref: 'incident',
           
}],
productComplaint:[{        
    type:Schema.Types.ObjectId,
    ref: 'productComplaint',
           
}],
securityReport:[{        
    type:Schema.Types.ObjectId,
    ref: 'securityReport',
           
}],
serviceComplaint:[{        
    type:Schema.Types.ObjectId,
    ref: 'serviceComplaint',
           
}],
notification:[{        
    type:Schema.Types.ObjectId,
    ref: 'notification',
           
}],

})
module.exports = mongoose.model('users', User)