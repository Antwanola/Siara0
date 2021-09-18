require('dotenv').config();
const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController');
const user = require('../../models/user');





//Register endpoint
router.post('/register', authController.register,() => {})
//login
router.post('/login', authController.login,  ()=>{})

//Login endpoint
router.get('/refresh-token', authController.authenticationToken,(req, res)=>{
    res.json({user:user})
})


//Logout
router.delete('/logout',  (req, res)=>{
    
    res.redirect('/')
})






 


module.exports = router;