const express = require('express');
const router = express.Router();
const users = require('../../models/user')
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken')


//Auth Ednpoits
router.post('/register', (req, res)=>{
    const {username, password} = req.body
    
})