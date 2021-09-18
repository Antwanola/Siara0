const incident = require('../models/incident')
const accident = require('../models/accident')
const healthReport = require('../models/healthReport')
const securityReport = require('../models/securityReport')
const environmentalReport = require('../models/environmentalReport')
const emergencyReport = require('../models/emergencyReport')
const productComplaint = require('../models/productComplaint')
const serviceComplaint = require('../models/serviceComplaint');
const { isEmpty } = require('../helpers/formHelpers')


module.exports={
    Incident:(req, res, next)=>{
        const payload =new incident({
            // user:req.user._Id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonimous,
            username:req.body.name,
            phone: req.body.phone
        })
        payload.save().then(saved=>{
            console.log({user:saved.user})
            if(saved) res.status(200).json({saved})
        })
        .catch(err=>{
            if(err)
            res.status(400).json({err:err.message})
        })
        next()
    },

    accident:(req, res, next)=>{
        const payload =new accident( {
            // user:req.user._Id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonimous,
            username:req.body.name,
            phone: req.body.phone
            })
           payload.save().then(saved=>{
              if(saved) return res.status(200).json({saved})
           })
           .catch(err=>{
           if(err) return res.status(400).json({err:err.message})
        })
        next()
    },
    healthReport:(req, res, next)=>{
        const payload =new healthReport( {
            // user:req.user._Id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            age:req.body.age,
            sex:req.body.sex,
            pOccurence_detail:req.body.pOccurence_detail,
            pOccurence:req.body.pOccurence,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonymous,
            username:req.body.name,
            phone: req.body.phone
            })
           payload.save().then(saved=>{
              if(saved) return res.status(200).json({saved})
           })
           .catch(err=>{
           if(err) return res.status(400).json({err:err.message})
        })
        next()
    },

    security:(req, res, next)=>{
        const payload =new securityReport( {
            // user:req.user._Id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            pOccurence_detail:req.body.pOccurence_detail,
            pOccurence:req.body.pOccurence,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonymous,
            username:req.body.name,
            phone: req.body.phone
            })
           payload.save().then(saved=>{
              if(saved) return res.status(200).json({saved})
           })
           .catch(err=>{
           if(err) return res.status(400).json({err:err.message})
        })
        next()
    },

    envReport:(req, res, next)=>{

        const payload = new environmentalReport({
            // user:req.user._Id,
            street: req.body.street,
            lga: req.body.lga,
            state: req.body.state,
            date: req.body.date,
            time: req.body.time,
            pOccurence_detail: req.body.pOccurence_detail,
            pOccurence: req.body.pOccurence,
            report: req.body.report,
            eResponse: req.body.eResponse,
            eResponse_needed: req.body.eResponse_needed,
            anonymous: req.body.anonymous,
            username: req.body.name,
            phone: req.body.phone
        })
        payload.save().then(saved => {
                if (saved) return res.status(200).json({
                    saved
                })
            })
            .catch(err => {
                if (err) return res.status(400).json({
                    err: err.message
                })
            })
            next()
    },
    emergReport:(req, res, next)=>{
        const payload = new emergencyReport({
            // user:req.user._Id,
            street: req.body.street,
            lga: req.body.lga,
            state: req.body.state,
            date: req.body.date,
            time: req.body.time,
            pOccurence_detail: req.body.pOccurence_detail,
            pOccurence: req.body.pOccurence,
            report: req.body.report,
            eResponse: req.body.eResponse,
            eResponse_needed: req.body.eResponse_needed,
            anonymous: req.body.anonymous,
            username: req.body.name,
            phone: req.body.phone
        })
        payload.save().then(saved => {
                if (saved) return res.status(200).json({
                    saved
                })
            })
            .catch(err => {
                if (err) return res.status(400).json({
                    err: err.message
                })
            })
            next()
    },

    prodComplaint:(req, res, next)=>{
        const payload = new productComplaint({
            // user:req.user._Id,
            street: req.body.street,
            lga: req.body.lga,
            state: req.body.state,
            date: req.body.date,
            time: req.body.time,
            product_type: req.body.product_type,
            product_brand: req.body.product_brand,
            batch_number: req.body.batch_number,
            product_narration: req.body.product_narration,
            supplier: req.body.supplier,
            expiry_date: req.body.expiry_date,
            anonymous: req.body.anonymous,
            username: req.body.name,
            phone: req.body.phone
        })
        payload.save().then(saved => {
                if (saved) return res.status(200).json({
                    saved
                })
            })
            .catch(err => {
                if (err) return res.status(400).json({
                    err: err.message
                })
            })
            next()
    },
    servComplaint:(req, res, next)=>{
        const payload = new serviceComplaint({

            // user:req.user._Id,
            street: req.body.street,
            lga: req.body.lga,
            state: req.body.state,
            date: req.body.date,
            time: req.body.time,
            service_description: req.body.service_description,
            complaint_narration: req.body.complaint_narration,
            provider_name: req.body.provider_name,
            agreement_detail: req.body.agreement_detail,
            complaint_evidence: req.body.complaint_evidence,
            service_feedback: req.body.service_feedback,
            anonymous: req.body.anonymous,
            username: req.body.name,
            phone: req.body.phone
        })
          payload.save().then(saved => {
                if (saved) return res.status(200).json({
                    saved
                })
            })
            .catch(err => {
                if (err) return res.status(400).json({
                    err: err.message
                })
            })

    }
    



}