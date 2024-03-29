const Jwt = require('jsonwebtoken')
const createError = require('http-errors');
const user = require('../models/user')
require('dotenv').config();
const tokenStore = require('../models/tokenStore')

const {isEmpty} = require('../helpers/formHelpers')
// const {sendNotification}  = require('../Notifications/firebase')
const path = require('path')




function generateToken(User){
  return  Jwt.sign({User}, process.env.SECRETE_TOKEN, {expiresIn: 1000 * 60 * 60 * 24*30})
}

 function verifyToken(User){
  return Jwt.verify({User}, process.env.SECRETE_TOKEN)
 }



module.exports = {
  generateToken,
  verifyToken,
 
register:(req, res, next)=>{
    const User = new user({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
  })
  try {
    user.findOne({phone:User.phone}).then(payload=>{
      
    if(payload == null || !payload){
    User.save().then(saved=>{        
        const accessToken =  generateToken(saved)
        res.status(200).json({ accessToken, saved, status:'OK'})
    })    
    
    }
       else{
        if(payload.phone == User.phone || payload.email == User.email){
            res.send('User already exist ')
        }
    }
     
      next()
      
    })
    
  } catch (error) {
    res.send(error.message)
    
  } 
  
  },
  login:(req, res, next)=>{
    const request = req.body.phone
    user.findOne({phone:request}).then(payload=>{        
      if(payload == null || !payload){
               res.status(403).json({
                message: `User with the number ${request} doesn't exist. Please sign Up`,
              });
              return
          }
      else{
          const token = generateToken(payload)         
          return res.status(200).json({payload, token});
          
           }  
    })
    .catch(err=>{
        res.json({error:err.message})
  
    })
    next()
  },  


getProfile:(req, res, next)=>{
  
    user.findOne({_id:req.user.User._id}).then(User=>{
      const user = {
        name:User.name,
        email:User.email,
        phone:User.phone,
        picture:User.picture,
        createdTime:User.createdTime
      }
     console.log(user)
     return res.status(200).send({user})
    })
    .catch(e=>{
      return res.send(e.message)
    })
    
  next()
},

updateProfile:(req, res, next)=>{
  const userId = req.user.User._id  
  console.log(userId)
  user.findOne({_id:userId}).then(User=>{
    console.log({name:req.body.name})
    User.email = req.body.email,
    User.phone = req.body.phone,
    User.name = req.body.name
      if(!isEmpty(req.files)){
        
        filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
       //  console.log( filetypes.test(path.extname(req.files.media.name)))
        if(filetypes.test(path.extname(req.files.picture.name))){
            let Picture =  req.files.picture
          fileName = Date.now() + '-' +  Picture.name
       
          Picture.mv('./public/uploads/profile/'+fileName, (err, )=>{
            if(err) res.send(err.message)           
            
          })
       }
       User.picture = fileName
    User.save().then(saved=>{
      console.log(saved)
    })
    }
   
    // const payload = {
    //   name:User.name,
    //   email:User.email,
    //   phone:User.phone,
    //   picture:User.picture,
    //   createdTime:User.createdTime
    // }
    res.status(200).json({status:'OK', message: 'Profile Updated', user:User})
  
  })
  .catch(err=>{
    res.send(err.message) 
  })
next()
},


authenticationToken:(req, res, next)=>{
  const authHeader = req.headers["authorization"];
   if(!authHeader) return res.status(401).send('Acess Denied / Unauthorized  request')
  try {  
  const token = authHeader && authHeader.split(' ')[1]
  if(token === 'null' ||!token) return res.status(404).send('Unauthorized request')

  Jwt.verify(token, process.env.SECRETE_TOKEN, (err, user)=>{
      if(err)return res.status(403).send('Unauthorized request')
      req.user = user
     
  })
    
  } catch (err) {
    if(err) return res.send(err.message)
  } 
  next()
},

}
  
