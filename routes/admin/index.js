const router = require('express').Router()
const accident = require('../../models/accident')
const incident = require('../../models/incident')

//Accident
router.get('/accident', (req, res)=>{
accident.find({}).then(payload=>{
    res.send(payload)
})
    
})

//incident
router.get('/accident', (req, res)=>{
    incident.find({}).then(payload=>{
        res.send(payload)
    })
        
    })
    


module.exports = router;