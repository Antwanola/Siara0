const accident = require('../../models/accident')
const emergencyReport = require('../../models/emergencyReport')
const environmentalReport = require('../../models/environmentalReport')
const healthReport = require('../../models/healthReport')
const incident = require('../../models/incident')
const productComplaint = require('../../models/productComplaint')
const securityReport = require('../../models/securityReport')
const serviceComplaint = require('../../models/serviceComplaint')
const user = require('../../models/user')

module.exports = {
    //accident middlewear
    Accident: (req, res, next) => {
        accident.find({}).lean().populate('user').then(payload => {
                return res.render('admin/accident/accidentList', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })

    },
    //Edit Accident
    editAccident: (req, res, next) => {
        try {
            accident.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                res.render('admin/accident/edit', {
                    payload
                })
            })
        } catch (error) {
            res.send(error)

        }

        next()

    },
    putAccident: (req, res, next) => {
        const {
            state,
            lga,
            street,
            date,
            time,
            eResponse,
            eResponse_needed,
            report,
            name,
            phone
        } = req.body
        accident.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {

                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false
                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;


                payload.save().then(saved => {
                    res.redirect('/admin/accident')
                })

            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()

    },

    //delete accident
    deleteAccident: (req, res, next) => {
        accident.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {
                console.log(removed)
            })
            res.redirect('/admin/accident')
        })
        next()
    },




    //Incident
    Incident: (req, res, next) => {
        incident.find({}).lean().then(payload => {
                res.render('admin/incident/incidentList', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()


    },

    //Edit Incident
    editIncident: (req, res, next) => {
        incident.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                res.render('admin/incident/edit', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()
    },
    //Put Incident
    putIncident: (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            report,
            eResponse,
            eResponse_needed
        } = req.body
        incident.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false
                //  req.body.eResponse? eResponse = true: eResponse = false
                //  req.body.eResponse_needed? eResponse_needed=true: eResponse_needed = false
                //recored new values to be saved

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;


                payload.save().then(saved => {
                        console.log(saved)

                        res.status(200).redirect('/admin/incident')

                    })
                    .catch(err => {
                        res.status(401).json({
                            error: err.message
                        })

                    })
            })

            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()
    },
    //delete Incident
    deleteIncident: (req, res, next) => {
        incident.findOne({
                _id: req.params.id
            }).then(payload => {
                payload.remove().then(removed => {
                    console.log(removed)
                })
                res.redirect('/admin/incident')
            })
            .catch(err => {
                res.send({
                    error: err.message
                })
            })
        next()
    },



    //Emergency Report
    EmergencyRepoert: (req, res, next) => {
        emergencyReport.find({}).then(payload => {
                res.status(200)
                return res.json({
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })
    },
    //Environment report

    Environmental: (req, res, next) => {
        environmentalReport.find({}).then(payload => {
                res.status(200)
                return res.json({
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })
    },

    //Health Report
    HealthReport: (req, res, next) => {
        healthReport.find({}).lean().populate('user').then(payload => {
                res.render('admin/health/healthList', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })
    },

    //Edit Health
    editHealthReport: (req, res, next) => {
        healthReport.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                res.render('admin/health/edit', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })
    },
    //Update Health
    putHealthReport: (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            report,
            eResponse,
            eResponse_needed,
            pOccurence_detail,
            age,
            sex,
            pOccurence
        } = req.body
        healthReport.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false

                //  req.body.eResponse? eResponse = true: eResponse = false
                //  req.body.eResponse_needed? eResponse_needed=true: eResponse_needed = false
                //recored new values to be saved

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.age = age;
                payload.sex = sex;
                payload.pOccurence = pOccurence;
                payload.pOccurence_detail = pOccurence_detail;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;


                payload.save().then(saved => {
                        console.log(saved)

                        res.status(200).redirect('/admin/health')

                    })
                    .catch(err => {
                        res.status(401).json({
                            error: err.message
                        })

                    })
            })

            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()

    },
    //delete
    deletehealthReport: (req, res, next) => {
        healthReport.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {
                console.log(removed)
            })
            res.redirect('/admin/health')
        })
        next()
    },





    //Security
    //Get Security Report
    getSecurityReport: (req, res, next) => {
        securityReport.find({}).lean().then(payload => {
                res.render('admin/security/securityList', {
                    payload
                })

            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
                next()
            })
    },

    //edit security report
    editSecurityReport: (req, res, next) => {
        securityReport.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                res.render('admin/security/edit', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()
    },
    //put security
    putSecurityReport: (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            report,
            eResponse,
            eResponse_needed,
            pOccurence_detail,
            age,
            sex,
            pOccurence
        } = req.body
        securityReport.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true
                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.age = age;
                payload.sex = sex;
                payload.pOccurence = pOccurence;
                payload.pOccurence_detail = pOccurence_detail;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;


                payload.save().then(saved => {
                        console.log(saved)

                        res.status(200).redirect('/admin/security')

                    })
                    .catch(err => {
                        res.status(401).json({
                            error: err.message
                        })

                    })
            })

            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()

    },
    //delete security
    deleteSecurityReport: (req, res, next) => {
        securityReport.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {

            })
            res.redirect('/admin/security')
        })
        next()

    },
//service Compliant

    ServiceComplaint: (req, res, next) => {
        serviceComplaint.find({}).lean().then(payload => {
                res.status(200)
                return res.render('admin/service/serviceComplaint',{
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
            })
            next()
    },
//Edit
editServiceComplaint: (req, res,next) => {
    serviceComplaint.findOne({_id:req.params.id}).lean().then(payload => {
            res.status(200)
            return res.render('admin/service/edit',{
                payload
            })
        })
        .catch(err => {
            res.status(401).json({
                error: err.message
            })
        })
        next()
},
//update
updateServiceComplaint:(req, res, next)=>{
    const {name, phone, state,lga, street, date, time, service_description, complaint_narration, provider_name, agreement_detail, complaint_evidence, service_feedback, anonymous} =req.body
serviceComplaint.findOneAndUpdate({_id:req.params.id}).then(payload=>{
    let anonymous = true

    // Set all boolean fields to true bollean val
    req.body.anonymous ? anonymous = true : anonymous = false

    payload.street = street;
    payload.state = state;
    payload.lga = lga;
    payload.name = name;
    payload.phone = phone;
    payload.date = date;
    payload.time = time;

    payload.service_description = service_description;
    payload.complaint_narration = complaint_narration;
    payload.provider_name = provider_name;
    payload.agreement_detail = agreement_detail;
    payload.complaint_evidence = complaint_evidence;
    payload.service_feedback = service_feedback;
    payload.anonymous = anonymous;
    
    payload.save().then(saved=>{
        res.redirect('/admin/service-complaint')
    })
    .catch(err=>{
        res.send(err.message)
    })

})
.catch(err=>{
    res.send(err.message)
})
next()
},

//delete
deleteServiceComplaint: async (req, res, next) => {
    await serviceComplaint.findOne({
        _id: req.params.id
    }).then(payload => {
        payload.remove().then(removed => {

        })
        res.redirect('/admin/environmental')
    })
    next()

},



    //Get Environmental
    Environmental: (req, res, next) => {
        environmentalReport.find({}).lean().populate('user').then(payload => {
                console.log(payload)
                res.render('admin/environmental/envList', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })
            })
        next()
    },
    //Edit
    editEnvironmental: (req, res, next) => {
        environmentalReport.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                res.render('admin/environmental/edit', {
                    payload
                })
            })
            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()

    },

    //update
    putEnvironmental: async (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            report,
            eResponse,
            eResponse_needed,
            pOccurence_detail,
            pOccurence
        } = req.body
        await environmentalReport.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;

                payload.pOccurence = pOccurence;
                payload.pOccurence_detail = pOccurence_detail;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;


                payload.save().then(saved => {
                        console.log(saved)

                        res.status(200).redirect('/admin/environmental')

                    })
                    .catch(err => {
                        res.status(401).json({
                            error: err.message
                        })

                    })
            })

            .catch(err => {
                res.status(401).json({
                    error: err.message
                })

            })
        next()

    },
    deleteEvironmental: async (req, res, next) => {
        await environmentalReport.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {

            })
            res.redirect('/admin/environmental')
        })
        next()

    },


    //Users
    usersList: async (req, res, next) => {
        await user.find({}).lean().then(payload => {
            res.render('admin/user/usersList', {
                payload
            })
            console.log(payload)
        })
        next()
    },
    //edit
    editUser: async (req, res, next) => {
        await user.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                if (payload) {
                    res.render('admin/user/edit', {
                        payload
                    })
                }

            })
            .catch(err => {
                res.send(err.message)
            })
        next()
    },

    //Update
    updateUser: async (req, res, next) => {
        const {
            name,
            email,
            phone,
            role
        } = req.body
        await user.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                payload.name = name;
                payload.email = email;
                payload.phone = phone;
                payload.role = role;

                payload.save().then(saved => {
                        res.redirect('/admin/users')
                    })
                    .catch(err => {
                        res.send(err.message)
                    })

            })
            .catch(err => {
                res.send(err.message)
            })
        next()
    },
    //delete user
    deleteUser: async (req, res, next) => {
        await user.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {

            })
            res.redirect('/admin/users')
        })
        next()

    },

    // //Get Emergency
    getEmergency: async (req, res, next) => {
        await emergencyReport.find({}).lean().then(payload => {
                res.render('admin/emergency/emergencyList', {
                    payload
                })
            })
            .catch(err => {
                res.send(err.message)
            })
    },
    //Edit
    editEmergency: (req, res, next) => {
        emergencyReport.findOne({
                _id: req.params.id
            }).lean().then(payload => {
                console.log(payload)
                res.render('admin/emergency/edit', {
                    payload
                })
            })
            .catch(err => {
                res.send(err.message)
            })
        next()
    },
    //Update Emergency
    updateEmergency: (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            report,
            eResponse,
            eResponse_needed,
            pOccurence_detail,
            pOccurence
        } = req.body
        emergencyReport.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.pOccurence = pOccurence;
                payload.pOccurence_detail = pOccurence_detail;
                payload.eResponse = eResponse;
                payload.eResponse_needed = eResponse_needed;
                payload.anonymous = anonymous;
                payload.report = report;

                payload.save().then(saved => {
                        res.redirect('/admin/emergency')
                    })
                    .catch(err => {
                        res.send(err.maessage)
                    })
            })
            .catch(err => {
                res.send(err.maessage)
            })
        next()
    },

    //delete emergency
    deleteEmergency: async (req, res, next) => {
        await emergencyReport.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {

            })
            res.redirect('/admin/emergency')
        })
        next()

    },



    // //Get Product complaint
    getProductComplaint: async (req, res, next) => {
        await productComplaint.find({}).lean().then(payload => {
               res.render('admin/productComplaint/productList', {
                    payload
                })
                })
            .catch(err => {
                res.send(err.message) 
            })
            next()
    },
    //Edit
    editProductComplaint: (req, res, next) => {
        productComplaint.findOne({
                _id: req.params.id
            }).lean().then(payload => {

                res.render('admin/productComplaint/edit', {
                    payload
                })
            })
            .catch(err => {
                res.send(err.message)
            })
        next()
    },
    //Update Emergency
    updateProductComplaint: (req, res, next) => {
        const {
            street,
            lga,
            state,
            name,
            phone,
            date,
            time,
            product_type,
            product_brand,
            batch_number,
            product_narration,
            supplier,
            expiry_date
        } = req.body
        productComplaint.findByIdAndUpdate({
                _id: req.params.id
            }).then(payload => {
                let anonymous = true

                // Set all boolean fields to true bollean val
                req.body.anonymous ? anonymous = true : anonymous = false

                payload.street = street;
                payload.state = state;
                payload.lga = lga;
                payload.name = name;
                payload.phone = phone;
                payload.date = date;
                payload.time = time;
                payload.product_type= product_type;
                payload.product_brand = product_brand;
                payload.batch_number = batch_number;
                payload.product_narration = product_narration;
                payload.supplier = supplier;
                payload.expiry_date = expiry_date;
                payload.anonymous = anonymous;
               
                console.log(payload)
                payload.save().then(saved => {
                        res.redirect('/admin/product-complaint')
                    })
                    .catch(err => {
                        res.send(err.maessage)
                    })
            })
            .catch(err => {
                res.send(err.maessage)
            })
        next()
    },

    //delete emergency
    deleteProductComplaint: async (req, res, next) => {
        await productComplaint.findOne({
            _id: req.params.id
        }).then(payload => {
            payload.remove().then(removed => {

            })
            res.redirect('/admin/emergency')
        })
        next()

    },




    //Get chat
    chat: (req, res, next) => {
        res.render('admin/chat')

    }
}