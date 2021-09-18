const router = require('express').Router()
const {userAuth, isAdmin} = require('../../helpers/authHelper');
// const incident = require('../../models/incident')
const {
  Accident,
  Incident,
  EmergencyRepoert,
  HealthReport,
  getSecurityReport,
  Environmental,
  ServiceComplaint,
  editIncident,
  putIncident,
  editAccident,
  putAccident,
  editHealthReport,
  putHealthReport,
  editSecurityReport,
  deleteAccident,
  deleteIncident,
  deletehealthReport,
  deleteSecurityReport,
  putSecurityReport,
  editEnvironmental,
  putEnvironmental,
  deleteEvironmental,
  usersList,
  editUser,
  updateUser,
  chat,
  getEmergency,
  editEmergency,
  updateEmergency,
  deleteEmergency,
  getProductComplaint,
  editProductComplaint,
  updateProductComplaint,
  deleteProductComplaint,
  editServiceComplaint,
  updateServiceComplaint,
  deleteServiceComplaint,
} = require('./middlewear')


router.all('/*',userAuth, isAdmin, (req, res, next)=>{
  req.app.locals.layout = 'admin'
  next()
})


//Admin onboarding
router.get('/', (req, res) => {
  res.render('admin/dashboard')
})

//Dashboard
router.get('/dashboard', (req, res)=>{
  res.render('admin/dashboard') 
})


//Register view
// router.get('/register', (req, res) => {
//   res.render()
// })


//Login
// router.get('/login', (req, res) => {
//   res.render('admin/login', {title:'login'})
// })





//Accident
router.get('/accident', Accident, () => {})
//Edit Accident
router.get('/accident/edit/:id',editAccident, ()=>{})
//Put Accident
router.put('/accident/edit/update/:id',putAccident, ()=>{})
router.delete('/accident/delete/:id',deleteAccident, ()=>{})

//incident
router.get('/incident', Incident, () => {})
//Edit Incident
router.get('/incident/edit/:id', editIncident, () => {})
//Put Incident
router.put('/incident/edit/update/:id',putIncident, () => {})

router.delete('/incident/delete/:id',deleteIncident, () => {})


//Emergency Report
router.get('/emergency-report', EmergencyRepoert, (req, res) => {})



//Healkth Reports
//get
router.get('/health', HealthReport, () => {})
//edit
router.get('/health/edit/:id', editHealthReport, () => {})
//update
router.put('/health/edit/update/:id',putHealthReport, () => {})
//delete
router.delete('/health/delete/:id',deletehealthReport, () => {})






//Security Reports
router.get('/security', getSecurityReport, (req, res) => {})
//edit
router.get('/security/edit/:id', editSecurityReport, () => {})
//put
router.put('/security/update/:id', putSecurityReport, () => {})
//delete
router.delete('/security/delete/:id', deleteSecurityReport, () => {})


//service Complaints
router.get('/service-complaint', ServiceComplaint, () => {})
//edit
router.get('/service-complaint/edit/:id', editServiceComplaint, () => {})
//update
router.put('/service-complaint/update/:id', updateServiceComplaint, () => {})
//delete
router.delete('/service-complaint/delete/:id', deleteServiceComplaint, () => {})


//Environmental
router.get('/environmental', Environmental,()=>{})
//Edit
router.get('/environmental/edit/:id', editEnvironmental,()=>{})
//Update
router.put('/environmental/update/:id', putEnvironmental,()=>{})
//delete
router.delete('/environmental/delete/:id',deleteEvironmental ,()=>{})

//Get Emergency
router.get('/emergency', getEmergency,()=>{})
//edit
router.get('/emergency/edit/:id', editEmergency,()=>{})
//update
router.put('/emergency/update/:id', updateEmergency,()=>{})
//delete
router.delete('/emergency/delete/:id', deleteEmergency,()=>{})

//Users List
router.get('/users',usersList, ()=>{})
//edit
router.get('/users/edit/:id',editUser, ()=>{})
//Update
router.put('/users/update/:id',updateUser, ()=>{})
//delete
router.delete('/users/delete/:id',deleteEmergency, ()=>{})


//Product-complaint List
router.get('/product-complaint',getProductComplaint, ()=>{})
//edit
router.get('/product-complaint/edit/:id',editProductComplaint, ()=>{})
//Update
router.put('/product-complaint/update/:id',updateProductComplaint, ()=>{})
//delete
router.delete('/product-complaint/delete/:id',deleteProductComplaint, ()=>{})

//get chat
.get('/chat',chat)


module.exports = router;