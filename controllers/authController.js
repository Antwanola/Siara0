const Jwt = require('jsonwebtoken')
const createError = require('http-errors');
const user = require('../models/user')
require('dotenv').config();

function generateToken(User){
  return  Jwt.sign({User}, process.env.SECRETE_TOKEN, {expiresIn: 365 * 24 * 60 * 60})
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
  user.findOne({phone:User.phone}).then(payload=>{
    console.log(User)
    
  if(payload == null){
  User.save().then(saved=>{
      
      const accessToken =  generateToken(saved.id)
      const refreshToken = Jwt.sign({id:saved.id}, process.env.REFRESH_TOKEN)
      req.accessToken = accessToken
      res.status(200).json({ accessToken, refreshToken,  saved })
  })    
  
  }
     else{
      if(payload.phone == User.phone || payload.email == User.email){
          res.status(403).send('User already exist ')
      }
  }
    next()
  })
  
  },
  login:(req, res, next)=>{
    const request = req.body.phone
    user.findOne({phone:request}).then(payload=>{        
      if(payload == null || !payload){
              return res.status(403).json({
                  message: `Userwith the number${request} doesn't exist. Please sign Up`,
                
              });
          }
      
      else{
         
          const token = generateToken(payload.id)
          const refreshToken =  Jwt.sign({id:payload.id}, process.env.REFRESH_TOKEN)
          req.token = token 
          return res.status(400).json({payload, token, refreshToken});
           }  
    })
    .catch(err=>{
        res.json({error:err.message})
  
    })
    next()
  },  

authenticationToken:(req, res,next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(404)

  Jwt.verify(token, process.env.SECRETE_TOKEN, (err, user)=>{
      if(err)return res.sendStatus(403)

      req.user = user
     
      next()
  }) 
},

  }
  