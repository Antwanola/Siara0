const express = require('express')
const router = express.Router()
const {authenticationToken} = require('../../controllers/authController')
const {
    Incident,
    accident,
    healthReport,
    security,
    envReport,
    emergReport,
    prodComplaint,
    servComplaint,
    newDataSort,
    history
} = require('../../controllers/formController')


/**
 * @swagger
 * components:
 *   schemas:
 *     incident:
 *      types: object
 *      properties:
 *       user: 
 *         type: object
 *         decription: current user onject
 *       name:
 *         type: string
 *         description: user name
 *       phone:
 *         type: string
 *         description: phone
 *       state:
 *         type: string
 *         description: state
 *       lga:
 *         type: string
 *         description: lga(local government arear)
 *       street:
 *         type: string
 *         description: street
 *       date:
 *         type: string
 *         description: date
 *       time:
 *         type: string
 *         description: time
 *       eResponse:
 *         type: string
 *         description: Emergency responses
 *       eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *       anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *       report:
 *         type: string
 *         description: user report
 *       media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     accident:
 *       types: object
 *       properties:
 *        user: 
 *         type: object
 *         decription: current user onject
 *        name:
 *         type: string
 *         description: user name
 *        phone:
 *         type: string
 *         description: phone
 *        state:
 *         type: string
 *         description: state
 *        lga:
 *         type: string
 *         description: lga(local government arear)
 *        street:
 *         type: string
 *         description: street
 *        date:
 *         type: string
 *         description: date
 *        time:
 *         type: string
 *         description: time
 *        eResponse:
 *         type: string
 *         description: Emergency responses
 *        eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *        anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *        report:
 *         type: string
 *         description: user report
 *        media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     emergencyReport:
 *       types: object
 *       properties:
 *        user: 
 *         type: object
 *         decription: current user onject
 *        name:
 *         type: string
 *         description: user name
 *        phone:
 *         type: string
 *         description: phone
 *        state:
 *         type: string
 *         description: state
 *        lga:
 *         type: string
 *         description: lga(local government arear)
 *        street:
 *         type: string
 *         description: street
 *        date:
 *         type: string
 *         description: date
 *        time:
 *         type: string
 *         description: time
 *        pOccurence:
 *         type: string
 *         description: Previous occurrence
 *        pOccurence_detail:
 *         type: string
 *         description: Previous occurrence detail
 *        eResponse:
 *         type: string
 *         description: Emergency responses
 *        eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *        anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *        report:
 *         type: string
 *         description: user report
 *        media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     environmentalReport:
 *       types: object
 *       properties:
 *        user: 
 *         type: object
 *         decription: current user onject
 *        name:
 *         type: string
 *         description: user name
 *        phone:
 *         type: string
 *         description: phone
 *        state:
 *         type: string
 *         description: state
 *        lga:
 *         type: string
 *         description: lga(local government arear)
 *        street:
 *         type: string
 *         description: street
 *        date:
 *         type: string
 *         description: date
 *        time:
 *         type: string
 *         description: time
 *        pOccurence:
 *         type: string
 *         description: Previous occurrence
 *        pOccurence_detail:
 *         type: string
 *         description: Previous occurrence detail
 *        eResponse:
 *         type: string
 *         description: Emergency responses
 *        eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *        anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *        report:
 *         type: string
 *         description: user report
 *        media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     healthReport:
 *       types: object
 *       properties:
 *        user: 
 *         type: object
 *         decription: current user onject
 *        name:
 *         type: string
 *         description: user name
 *        phone:
 *         type: string
 *         description: phone
 *        state:
 *         type: string
 *         description: state
 *        lga:
 *         type: string
 *         description: lga(local government arear)
 *        street:
 *         type: string
 *         description: street
 *        date:
 *         type: string
 *         description: date
 *        time:
 *         type: string
 *         description: time
 *        pOccurence:
 *         type: string
 *         description: Previous occurrence
 *        pOccurence_detail:
 *         type: string
 *         description: Previous occurrence detail
 *        age: 
 *         type: number
 *         description: age
 *        sex: 
 *         type: string
 *         description: sex
 *        eResponse:
 *         type: string
 *         description: Emergency responses
 *        eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *        anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *        report:
 *         type: string
 *         description: user report
 *        media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     productComplaint:
 *      types: object
 *      properties:
 *       user: 
 *         type: object
 *         decription: current user onject
 *       name:
 *         type: string
 *         description: user name
 *       phone:
 *         type: string
 *         description: phone
 *       state:
 *         type: string
 *         description: state
 *       lga:
 *         type: string
 *         description: lga(local government arear)
 *       street:
 *         type: string
 *         description: street
 *       date:
 *         type: string
 *         description: date
 *       time:
 *         type: string
 *         description: time
 *       product_type:
 *         type: string
 *         description: product type
 *       product_brand: 
 *         type: string
 *         description: product brand
 *       batch_number: 
 *         type: string
 *         description: batch number
 *       product_narration: 
 *         type: string
 *         description: prduct narration
 *       supplier: 
 *         type: string
 *         description: supplier
 *       expiry_date: 
 *         type: string
 *         description: expiry date
 *       anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *       media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     securityReport:
 *      types: object
 *      properties:
 *       user: 
 *         type: object
 *         decription: current user onject
 *       name:
 *         type: string
 *         description: user name
 *       phone:
 *         type: string
 *         description: phone
 *       state:
 *         type: string
 *         description: state
 *       lga:
 *         type: string
 *         description: lga(local government arear)
 *       street:
 *         type: string
 *         description: street
 *       date:
 *         type: string
 *         description: date
 *       time:
 *         type: string
 *         description: time
 *       eResponse:
 *         type: string
 *         description: Emergency responses
 *       eResponse_needed:
 *         type: string
 *         description: Emergency response needed? yes or no
 *       pOccurence:
 *         type: string
 *         description: previous occurence
 *       pOccurence_details:
 *         type: string
 *         description: previous occurence details
 *       anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *       report:
 *         type: string
 *         description: user report
 *       media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *     serviceComplaint:
 *      types: object
 *      properties:
 *       user: 
 *         type: object
 *         decription: current user onject
 *       name:
 *         type: string
 *         description: user name
 *       phone:
 *         type: string
 *         description: phone
 *       state:
 *         type: string
 *         description: state
 *       lga:
 *         type: string
 *         description: lga(local government arear)
 *       street:
 *         type: string
 *         description: street
 *       date:
 *         type: string
 *         description: date
 *       time:
 *         type: string
 *         description: time
 *       service_description:
 *         type: string
 *         description: service descriotion
 *       complaint_narration: 
 *         type: string
 *         description: complaint anrration
 *       provider_name: 
 *         type: string
 *         description: provider name
 *       agreement_detail: 
 *         type: string
 *         description: agreement detail
 *       complaint_evidence: 
 *         type: string
 *         description: compalint evidence
 *       anonymous:
 *         type: string
 *         description: anonimous? yes or no
 *       media:
 *         type: string
 *         description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png
 *   
 */

/**
 * @swagger
 /incident:
 *     post:
 *       summary: Incident form.
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: user name
 *                phone:
 *                  type: string
 *                  description: phone
 *                state:
 *                  type: string
 *                  description: state
 *                lga:
 *                  type: string
 *                  description: lga(local government arear)
 *                street:
 *                  type: string
 *                  description: street
 *                date:
 *                  type: string
 *                  description: date
 *                time:
 *                  type: string
 *                  description: time
 *                eResponse:
 *                  type: string
 *                  description: Emergency responses
 *                eResponse_needed:
 *                  type: string
 *                  description: Emergency response needed? yes or no
 *                anonymous:
 *                  type: string
 *                  description: anonimous? yes or no
 *                media:
 *                  type: string
 *                  description: takes uploaded file, supported files are mp3,mp4,jpeg,jpg,gif, png    
 *                report:
 *                  type: string
 *                  description: user report
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

//Post Incident
router.post('/incident', authenticationToken, Incident, () => {})

//accident
/**
 * @swagger
 /accident:
 *     post:
 *       summary: accident form.
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/accident'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/accident', authenticationToken, accident, () => {})

//health report 

/**
 * @swagger
 /health-report:
 *     post:
 *       summary: Health report
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/healthReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/health-report',  authenticationToken, healthReport, () => {})

//security
/**
 * @swagger
 /security:
 *     post:
 *       summary: security report
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/securityReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

router.post('/security', authenticationToken, security, () => {})

//Environmental report
/**
 * @swagger
 /environmental-report:
 *     post:
 *       summary: Environmental report
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/environmentalReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/environmental-report', authenticationToken, envReport, () => {})

//Emergency report
/**
 * @swagger
 /emergency-report:
 *     post:
 *       summary: Emergency report
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/emergencyReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/emergency-report', authenticationToken, emergReport, () => {})
//Product complaint
/**
 * @swagger
 /product-complaint:
 *     post:
 *       summary: Product Complaint
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/productComplaint'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/product-complaint',authenticationToken, prodComplaint, () => {})

//Service complaint
/**
 * @swagger
 /service-complaint:
 *     post:
 *       summary: Service Complaint
 *       description: Post the form with all required data types. The file uplaod form sould be named "media"
 *       requestBody:
 *          content:
 *            multiparts/form-data:
 *             schema:
 *               $ref: '#/components/schemas/serviceComplaint'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/service-complaint', authenticationToken, servComplaint, () => {})

/**
 * //history
/**
 * @swagger
 /history:
 *     get:
 *       summary: gets, history of a user data 
 *       description: Gets the history of a user data based on the user id. User id can be found in token placed in the authorization header called bearer.
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 * 
 * 
 */

router.get('/history', authenticationToken, history, () => {})


/**
 * //notification
/**
 * @swagger
 /notification:
 *     get:
 *       summary: gets, notification of a user data 
 *       description: Gets the notification of a user data based on the user id. User id can be found in token placed in the authorization header called bearer.
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 * 
 * 
 */

router.get('/notification', authenticationToken, newDataSort, () => {})



module.exports = router;