const incident = require('../models/incident')
const accident = require('../models/accident')
const healthReport = require('../models/healthReport')
const securityReport = require('../models/securityReport')
const environmentalReport = require('../models/environmentalReport')
const emergencyReport = require('../models/emergencyReport')
const productComplaint = require('../models/productComplaint')
const serviceComplaint = require('../models/serviceComplaint');
const notification = require('../models/notification')
const history = require('../models/history')
const users = require('../models/user')
const {isEmpty} = require('../helpers/formHelpers')
const path = require('path')

const moment = require('moment')


// function notifications(data){
      
//     const myCurrentDate=new Date();
//     const myPastDate=new Date(myCurrentDate);
//     const calcDate = myPastDate.setDate(myPastDate.getDate() - 7)
//     // if(myCurrentDate> data.postedTime.){
//     //     console.log(true)
//     // }
//     console.log(myCurrentDate)
//     console.log(moment(calcDate).format('LL'))
// }


module.exports={


    newDataSort:(req, res, next)=>{


       
        notification.find({user:req.user.User._id}).sort({"createdTime": -1})
        // .populate({path: 'incident', options: { sort: { 'postedTime': -1 } } } )
        // .populate({path: 'accident', options: { sort: { 'postedTime': -1 } } })
        // .populate({path: 'emergencyReport', options: { sort: { 'postedTime': -1 } } })
        // .populate({path: 'environmentalReport', options: { sort: { 'postedTime': -1 } } }).limit(2)
        // .populate({path: 'healthReport', options: { sort: { 'postedTime': -1 } } })
        // .populate({path: 'productComplaint', options: { sort: { 'postedTime': -1 } } })
        // .populate({path: 'securityReport', options: { sort: { 'postedTime': -1 } } })
        // .populate({path: 'serviceComplaint', options: { sort: { 'postedTime': -1 } } })
        .then(result =>{
            console.log("hello")
           
                res.status(200).json(result)
            
            
            // result.sort().limit(1).then(sorted=>{
            //     console.log(sorted)
            // })
            
        })
        .catch(err=>{
            res.status(401).json({error:err.message})
        })
        next()

        

},

    // postNotification:(req, res, next)=>{
    //     const {note} = req.body;
    // },
    
    history:(req, res, next)=>{
      
        history.find({user:req.user.User._id})
        // .populate('incident')
        // .populate('environmentalReport')
        // .populate('accident')
        // .populate('emergencyReport')
        // .populate('healthReport')
        // .populate('productComplaint')
        // .populate('securityReport')
        // .populate('serviceComplaint')
        .then(result =>{
            res.status(200).json(result)
           
        })
        .catch(err=>{
            res.status(401).json({error:err.message})
        })
        next()

       
},
    Incident: (req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/incident/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
       
        const payload ={
            user:req.user.User._id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonimous,
            name:req.body.name,
            phone: req.body.phone,
            media: fileName
            
        }
        
        incident.create(payload, (err, data)=>{ 
            console.log(data)  
            res.status(200).json({status:'OK', message:'Report Posted'})
            users.findOneAndUpdate({_id:req.user.User._id}, {$push:{incident:data._id}}, {new:true}).then(User=>{
            }).catch(e=>{
                if(e) res.send(e.message)
            })
            const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'incident'
                    }
            notification.create(noteData)
            history.create(noteData)
           
            .catch(err=>{
                if(err)
                res.status(400).json({err:err.message})
            })
        })
       
        next()
    },

    
       
        

    accident:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/accident/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            user:req.user.User._id,
            street: req.body.street,
            lga:req.body.lga,
            state:req.body.state,
            date:req.body.date,
            time:req.body.time,
            report:req.body.report,
            eResponse:req.body.eResponse,
            eResponse_needed:req.body.eResponse_needed,
            anonymous:req.body.anonimous,
            name:req.body.name,
            phone: req.body.phone,
            media: fileName
            }
            accident.create(payload, (err, data)=>{
                
                 res.status(200).json({status:'OK', message:'Report Posted'})
                users.findOneAndUpdate({_id:req.user.User._id}, {$push:{accident:data._id}}, {new:true}).then(user=>{
                    res.status(200)
    
                })

                const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'accident'
                    }
            notification.create(noteData)
            history.create(noteData)
                // notification.findOne({user:req.user.User._id}).then(user=>{
                //     if( user == null || user.length<=0 ){
                //         const noteData = {
                //             user:req.user.User._id,
                //             accident:data._id,
                //             }
                            
                //         notification.create(noteData).then(note=>{
                //             res.status(200).json({note, message:'Notification Created'})
                //         })
                //        }
                //     else{
                //         notification.findOneAndUpdate({user: req.user.User._id}, {$push:{accident:data._id}}, {new:true}).then(user=>{
                //             res.status(200).json({status:'OK',message:'Report posted and all fields have been updated.'})
                //         })
            
                //     }
                // })
                // const noteData = {
                //     user:req.user.User._id,
                //     incident:data._id,
                // }
                // notification.create(noteData).then(note=>{
                //     res.status(200).json(note)
                // })
                .catch(err=>{
                    if(err)
                    res.status(400).json({err:err.message})
                })
            })
           
            next()
    },
    healthReport:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/health/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            user:req.user.User._id,
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
            name:req.body.name,
            phone: req.body.phone,
            media:fileName
            }

            healthReport.create(payload, (err, data)=>{
               
               res.status(200).json({status:'OK', message:'Report Posted'})
                users.findOneAndUpdate({_id:req.user.User._id}, {$push:{healthReport:data._id}}, {new:true}).then(user=>{
                    res.status(200)
    
                })
               const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'healthReport'
                    }
            notification.create(noteData)
            history.create(noteData)
                // const noteData = {
                //     user:req.user.User._id,
                //     incident:data._id,
                // }
                // notification.create(noteData).then(note=>{
                //     res.status(200).json(note)
                // })
                .catch(err=>{
                    if(err)
                    res.status(400).json({err:err.message})
                })
            })
           
            next()
},

    security:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/security/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload ={
            user:req.user.User._id,
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
            name:req.body.name,
            phone: req.body.phone,
            media:fileName
            }
            securityReport.create(payload, (err, data)=>{
                res.status(200).json({status:'OK', message: 'Report Posted'})
                users.findOneAndUpdate({_id:req.user.User._id}, {$push:{securityReport:data._id}}, {new:true}).then(user=>{
                    res.status(200)
    
                })
                const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'securityReport'
                    }
            notification.create(noteData)
            history.create(noteData)
                // const noteData = {
                //     user:req.user.User._id,
                //     incident:data._id,
                // }
                // notification.create(noteData).then(note=>{
                //     res.status(200).json(note)
                // })
                .catch(err=>{
                    if(err)
                    res.status(400).json({err:err.message})
                })
            })
           
            next()
    },

    envReport:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/environment/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            user:req.user.User._id,
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
            name: req.body.name,
            phone: req.body.phone,
            media:fileName
        }
        environmentalReport.create(payload, (err, data)=>{
            if(err) next(err)
              res.status(200).json({status:'OK', message: 'Report Posted'})
            users.findOneAndUpdate({_id:req.user.User._id}, {$push:{environmentalReport:data._id}}, {new:true}).then(user=>{
                res.status(200)

            })
           const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'environmentalReport'
                    }
            notification.create(noteData)
            history.create(noteData)
            // const noteData = {
            //     user:req.user.User._id,
            //     incident:data._id,
            // }
            // notification.create(noteData).then(note=>{
            //     res.status(200).json(note)
            // })
            .catch(err=>{
                if(err)
                res.status(400).json({err:err.message})
            })
        })
       
        next()
    },
    emergReport:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/emergency/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            user:req.user.User._id,
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
            name: req.body.name,
            phone: req.body.phone,
            media:fileName
        }
        emergencyReport.create(payload, (err, data)=>{
             if(err) next(err)
              res.status(200).json({status:'OK', message: 'Report Posted'})
            users.findOneAndUpdate({_id:req.user.User._id}, {$push:{emergencyReport:data._id}}, {new:true}).then(user=>{
                res.status(200)

            })
             const noteData = {
                    user:req.user.User._id,
                    report:payload.report,
                    type:'emergencyReport'
                    }
            notification.create(noteData)
            history.create(noteData)



            // notification.find({user:req.user.User._id}).then(user=>{
            //     if( user == null || user.length<=0 ){
            //         const noteData = {
            //             user:req.user.User._id,
            //             emergencyReport:data._id,
            //             }
            //         notification.create(noteData).then(note=>{
            //             res.status(200).json({note, message:'Notification Created'})
            //         })
            //        }
            //     else{
            //         notification.findOneAndUpdate({user: req.user.User._id}, {$push:{emergencyReport:data._id}}, {new:true}).then(user=>{
            //             res.status(200).json({status:'OK',message:'Report posted and all fields have been updated.'})
            //         })
        
            //     }
            // })
            // const noteData = {
            //     user:req.user.User._id,
            //     incident:data._id,
            // }
            // notification.create(noteData).then(note=>{
            //     res.status(200).json(note)
            // })
            .catch(err=>{
                if(err)
                res.status(400).json({err:err.message})
            })
        })
       
        next()
    },

    prodComplaint:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/product/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            user:req.user.User._id,
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
            name: req.body.name,
            phone: req.body.phone,
            media:fileName
        }
        productComplaint.create(payload, (err, data)=>{
             if(err) next(err)
              res.status(200).json({status:'OK', message: 'Report Posted'})
            users.findOneAndUpdate({_id:req.user.User._id}, {$push:{productComplaint:data._id}}, {new:true}).then(user=>{
                res.status(200)

            })
             const noteData = {
                    user:req.user.User._id,
                    report:payload.product_narration,
                    type:'productComplain'
                    }
            notification.create(noteData)
            history.create(noteData)
            .catch(err=>{
                if(err)
                res.status(400).json({err:err.message})
            })
        })
       
        next()

    },
    servComplaint:(req, res, next)=>{
        let fileName;
        if(req.files === null){
            fileName = ''
             }
 
         else{
            if(!isEmpty(req.files)){
             console.log(req.files)
             filetypes = /jpg|gif|jpeg|png|PNG|JPG|GIF|JPEG|MP3|MP4|mp3|mp4/
             console.log( filetypes.test(path.extname(req.files.media.name)))
             if(filetypes.test(path.extname(req.files.media.name))){
                 let media =  req.files.media
               fileName = Date.now() + '-' +  media.name
            
               media.mv('./uploads/service/'+fileName, (err)=>{
                 if(err) res.send(err.message)           
               })
            }
            else{
                return res.send({message:'Please use supported file format. You can add a picture, audio or video if available.'})
            }
             }
               
            
         }
        const payload = {
            
            user:req.user.User._id,
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
            name: req.body.name,
            phone: req.body.phone,
            media: fileName
        }
        serviceComplaint.create(payload, (err, data)=>{
             if(err) next(err)
              res.status(200).json({status:'OK', message: 'Report Posted'})
          
            users.findOneAndUpdate({_id:req.user.User._id}, {$push:{serviceComplaint:data._id}}, {new:true}).then(user=>{
                res.status(200)

            })
             const noteData = {
                    user:req.user.User._id,
                    report:payload.complaint_narration,
                    type:'serviceComplain'
                    }
            notification.create(noteData)
            history.create(noteData)
            // notification.find({user:req.user.User._id}).then(user=>{
            //     if( user == null || user.length<=0 ){
            //         const noteData = {
            //             user:req.user.User._id,
            //             serviceComplaint:data._id,
            //             }
            //         notification.create(noteData).then(note=>{
            //             res.status(200).json({note, message:'Notification Created'})
            //         })
            //        }
            //     else{
            //         notification.findOneAndUpdate({user: req.user.User._id}, {$push:{serviceComplaint:data._id}}, {new:true}).then(user=>{
            //             res.status(200).json({status:'OK',message:'Report posted and all fields have been updated.'})
            //         })
        
            //     }
            // })
            // const noteData = {
            //     user:req.user.User._id,
            //     incident:data._id,
            // }
            // notification.create(noteData).then(note=>{
            //     res.status(200).json(note)
            // })
            .catch(err=>{
                if(err)
                res.status(400).json({err:err.message})
            })
        })
       
        next()

    },

    getTest:(req, res, next)=>{

    }
    



}