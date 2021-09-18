const router = require('express').Router()
const {authorizationToken} = require('../controllers/authController')

//App Route
router.use('/api', require('./app/Auth'))
router.use('/api', require('./app/formSubmitionRoute'))






module.exports = router;