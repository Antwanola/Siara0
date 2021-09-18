const express = require('express');
const router = express.Router();
const users = require('../../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const { BadRequest } = require('http-errors');
const {generateToken} = require('../../controllers/authController')
const Role = require('../../helpers/role')

router.all('/*', (req, res, next)=>{
  req.app.locals.layout = 'login'
  next()
})



//Login
router.get('/', (req, res) => {
    res.render('admin/login', {title:'login'})
  })

  //Get Register
router.get('/register', (req, res) => {
    res.render('admin/register', {title:'register'})
  })
//Auth Ednpoits

//Register

router.post('/register', (req, res)=>{
    
  const user = new users({
      name:req.body.name,
      phone:req.body.phone,
      email:req.body.email,
      password:req.body.password
  })
 
  bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt,( err, hash)=>{
          user.password = hash
         
          user.save().then(saved=>{
                             
            }).catch(err=>{
              console.log(
                  err
              );
          })    
      })
  })
  
  
  req.flash('home_message',`You are sucessfully registered as ${user.email}. Please Login`)
  res.redirect('/')   
})



//Login with passport middlewear
 passport.use(new LocalStrategy({usernameField: 'email'},
    (email, password, done)=> { 
        users.findOne({email:email}).lean().then(user=>{
            
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
              }
              
              bcrypt.compare(password, user.password,(err, matched)=>{
                  if(err) return err
                  if(matched){
                    
                      return done(null, user, {message:"The password is correct"})
                     
                  }
                  else{
                        return done(null, false, {message:"The password is incorrect"})
                  }
              })
        }).catch(err=>{
            console.log(
                err
            );
        })
    }
  ))

  passport.serializeUser(function(user, done) {
   
    done(null, user._id);
    
    
  });
  
  passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
      done(err, user);
    });
  })
  
//login
router.post ('/', (req, res, next)=>{
    passport.authenticate('local', { 
        
    successRedirect: '/admin',
    failureRedirect: '/', 
    failureFlash: true 
})(req, res , next)

})
//Logout
router.get('/logout',  (req, res)=>{
    req.logOut()
    res.redirect('/login')
})









// router.post('/register', (req, res)=>{
//     const {name, phone,email, password} = req.body
//     if(!email || !password) return res.status(403).json({message:`username or passwords isn't provided`})
//     users.findOne({email:email}).then( user=>{
//         if(user){ return  res.status(400).json({message:`sorry ${user.name}, you already signed up. Please login `})
//         }
//         else{
                
//       const payload = new users({name, phone, email, password})
//        bcrypt.genSalt(10, (err, salt)=>{
//            if(err) return err
//            bcrypt.hash(payload.password, salt, (err, hash)=>{
//                if(err)return err
//               payload.password = hash
//             payload.save().then(saved=>{
//                 if(err) throw err
//                let token =  generateToken(payload.id)
//             return res.status(200).json({message:payload, token})
//             })
//                .catch(err=>{
//                 res.send(err.message)
//                })
               
//            })
          
//        } )

//         }
//     })
//     .catch(err=>{
//         res.send({error:err.message})
//     })
    
// })


//Login
// router.post('/login', (req, res)=>{
//     const {email, password} = req.body
//     if(!email || !password) return res.status(403).json({message:'please check E-mail and password provided'})
//      users.findOne({email:email}).then(User=>{
//          if(user = null) return res.status()
//          if(User.email === email){
//              bcrypt.compare(password, User.password, (err, matched)=>{
//                  if(matched){
//                     let token =  generateToken(User.id)
//                     res.status(200).json({token, User})
//                  }
//                  else{
//                      res.status(403).json({message:'Please check your password'})
//                  }
//              })
            
//          } 
//      })
//      .catch(err=>{
//          res.send({message:err.message})
//      })
  
// })
// //Get Users
// router.get('/users', (req, res)=>{
//     users.find({}).then(Users=>{
//         res.status(200).json({Users})
//     })
//     .catch(err=>{
//         res.status(400)
//         return res.json({error:err.message})
//     })
// })
// //set admi role
// router.put('/role/:id', (req, res)=>{
// users.updateOne({_id:req.params.id}, {$set:{role:Role.Admin}}).then(User=>{
//   res.send(User)
// })
// .catch(err=>{
//     res.send({error:err.message})
// })
// })

// //unset admin role
// router.put('/remove-role/:id', (req, res)=>{
//     users.updateOne({_id:req.params.id}, {$unset:{role:Role.Admin}}).then(User=>{
//       res.send(User)
//     })
//     .catch(err=>{
//         res.send({error:err.message})
//     })
//     })



module.exports = router;