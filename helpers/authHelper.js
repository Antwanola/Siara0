const user= require('../models/user')

module.exports = {

    userAuth:(req,res, next)=>{
    if(req.isAuthenticated()){
        
        return  next()
    }
    req.flash('error', `Please login to gain access to admin`); res.redirect('/')
    
    },
    isAdmin:(req, res, next)=>{
        if(req.user.role ==='admin'){
            return  next()
        }
        req.flash('error', `You are not an admin user`);res.redirect('/')
    }
   
    }