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
 *   
 */

/**
 * @swagger
 /incident:
 *     post:
 *       summary: Incident form.
 *       description: Key in incident data
 *       requestBody:
 *          content:
 *            application/json:
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
router.post('/incident', Incident, () => {})

//accident
/**
 * @swagger
 /accident:
 *     post:
 *       summary: accident form.
 *       description: Key in accident data
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/accident'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/accident', accident, () => {})

//health report 

/**
 * @swagger
 /health-report:
 *     post:
 *       summary: Health report
 *       description: Health report
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/healthReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/health-report', healthReport, () => {})

//security
/**
 * @swagger
 /security:
 *     post:
 *       summary: security report
 *       description: security report
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/securityReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */

router.post('/security', security, () => {})

//Environmental report
/**
 * @swagger
 /environmental-report:
 *     post:
 *       summary: Environmental report
 *       description: environmental report
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/environmentalReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/environmental-report', envReport, () => {})

//Emergency report
/**
 * @swagger
 /emergency-report:
 *     post:
 *       summary: Emergency report
 *       description: Emergency report
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/emergencyReport'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/emergency-report',emergReport, () => {})
//Product complaint
/**
 * @swagger
 /product-complaint:
 *     post:
 *       summary: Product Complaint
 *       description: product Complaint
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/productComplaint'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/product-complaint', prodComplaint, () => {})

//Service complaint
/**
 * @swagger
 /service-complaint:
 *     post:
 *       summary: Service Complaint
 *       description: service Complaint
 *       requestBody:
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/serviceComplaint'
 *       responses:
 *         200:
 *           description: OK
 *         404:
 *            description: bad request
 */
router.post('/service-complaint', servComplaint, () => {})

//Profile
router.post('/profile',(req, res)=>{})

module.exports = router;