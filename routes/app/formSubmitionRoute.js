const express = require('express')
const router = express.Router()
const {
    Incident,
    accident,
    healthReport,
    security,
    envReport,
    emergReport,
    prodComplaint,
    servComplaint,
} = require('../../controllers/formController')




//Post Incident
router.post('/incident', Incident, () => {})

//accident
router.post('/accident', accident, () => {})

//health report 
router.post('/health-report', healthReport, () => {})

//security
router.post('/security', security, () => {})

//Environmental report
router.post('/environmental-report', envReport, () => {})

//Emergency report
router.post('/emergency-report',emergReport, () => {})
//Product complaint
router.post('/product-complaint', prodComplaint, () => {})

//Service complaint
router.post('/service-complaint', servComplaint, () => {})

//Profile
router.post('/profile',(req, res)=>{})

module.exports = router;