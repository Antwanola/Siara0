require('dotenv').config();
const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {register,login, authenticationToken, logout, getProfile, updateProfile} = require('../../controllers/authController');
=======
const {register,login, authenticationToken} = require('../../controllers/authController');
>>>>>>> b012c2a30d1f81c846e4bff9564c7756c8998261
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
<<<<<<< HEAD

router.get('/test-token',authenticationToken,(req, res)=>{
    res.send({user: req.user})
=======
router.get('/refresh-token',authenticationToken,(req, res)=>{
    res.json({user:user})
>>>>>>> b012c2a30d1f81c846e4bff9564c7756c8998261
})


//Get Profile

/**
 * @swagger
 * /profile:
 *     get:
 *       summary: Get profile.
 *       description: get user profile by id passed from token decoded. It looks into the authorization header for token.
 *       
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

router.get('/profile',  authenticationToken, getProfile, ()=>{})
//Update profile
/**
 * @swagger
 * /profile-update:
 *     post:
 *       summary: update profile.
 *       description: uses the bearer method in the header to get and decode to for user auth. Takes the user aid from the decoded token and find the right user
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
router.post('/profile-update', authenticationToken,  updateProfile,()=>{})

//Logout
// router.get('/logout', logout, ()=>{})






 


module.exports = router;