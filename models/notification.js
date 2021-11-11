const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notification = new Schema({
  
   user:{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
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
attended:{
    type:String
},
})


module.exports = mongoose.model('notification',notification)