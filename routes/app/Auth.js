require('dotenv').config();
const express = require('express')
const router = express.Router()
const {register,login, authenticationToken} = require('../../controllers/authController');
const user = require('../../models/user');

//Swagger Schema components
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *      types: object
 *      properties:
 *        id: 
 *          type: integer
 *        name: 
 *          type: string
 *        email: 
 *          type: string
 *        phone: 
 *          type: number
 */



//Register endpoint
/**
 * @swagger
 * /register:
 *     post:
 *       summary: A sample user register.
 *       description: register user, name email and phone number is required
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: user name
 *                email:
 *                  type: string
 *                  description: emails
 *                phone:
 *                  type: string
 *                  description: A simple phone number. 
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

router.post('/register', register,() => {})
//login

/**
 * @swagger
 * /login:
 *     post:
 *       summary: A sample user login.
 *       description: login user,with just phone number
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *              properties:
 *                phone:
 *                  type: string
 *                  description: user name
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

router.post('/login', login,  ()=>{})

//Login endpoint
router.get('/refresh-token',authenticationToken,(req, res)=>{
    res.json({user:user})
})


//Logout
router.delete('/logout',  (req, res)=>{
    
    res.redirect('/')
})






 


module.exports = router;