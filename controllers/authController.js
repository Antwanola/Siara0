const Jwt = require('jsonwebtoken')
const createError = require('http-errors');
const user = require('../models/user')
require('dotenv').config();
const tokenStore = require('../models/tokenStore')
const fs = require('fs')
const {sendNotification}  = require('../Notifications/firebase')

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
     
      
    if(payload == null){
    User.save().then(saved=>{        
        const accessToken =  generateToken(saved.id)
        const refreshToken = Jwt.sign({id:saved.id}, process.env.REFRESH_TOKEN, {expiresIn :60* 60*24*7})        
        res.status(200).json({ accessToken, saved })
    })    
    
    }
       else{
        if(payload.phone == User.phone || payload.email == User.email){
            res.status(403).send('User already exist ')
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
               return res.status(403).json({
                message: `User with the number ${request} doesn't exist. Please sign Up`,
              });
          }
      else{
          const token = generateToken(payload)
          const refreshToken =  Jwt.sign({id:payload.id}, process.env.REFRESH_TOKEN, )         
         
          return res.status(200).json({payload, token, refreshToken});
          
           }  
    })
    .catch(err=>{
        res.json({error:err.message})
  
    })
    next()
  },  


getProfile:(req, res, next)=>{
   try {
    user.findById({_id:req.user.User._id}).then(User=>{
      const user = {
        name:User.name,
        email:User.email,
        phone:User.phone,
        createdTime:User.createdTime
      }
     
     return res.status(200).send({user})
    })
    
  } catch (error) {
    return res.send(error.message)
  }
  next()
  
},

updateProfile:(req, res, next)=>{
  const userId = req.user.User._id
  const {email, phone, name} = req.body
  try {
  user.find({_id:userId}).then(User=>{
    User.name = name;
    User.email = email;
    User.phone = phone
    User.save().then(saved=>{
      if(!saved) throw error
      res.status(200).send({message: 'User credential saved for ' + saved.name})
    })
  })
 
} catch (error) {
  res.send(error.message)
}
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
    
  } catch (error) {
    if(error) return res.send(error.message)
  } 
  next()
},


}
  