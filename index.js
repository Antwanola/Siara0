const Express = require('express')
const App = Express()
const handlebars = require('express-handlebars')
const fileupload = require('express-fileupload')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const {select, toggleStatus} = require('./helpers/generalHelpers')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const socketio = require('socket.io')
const errorHandler=  require('./helpers/errorHandler')
const user = require('./models/user')
const http = require('http')
const formatMessage = require('./utils/message')
// const chatUser = require('./utils/chatUser')
require('dotenv').config();
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const server = http.createServer(App)
const io = socketio(server)
const initFireBase = require("./Notifications/firebase")








io.use((socket, next)=>{
    sessionMiddle(socket.request, {}, next)
})



// dev_URI
mongoose.connect(process.env.dev_URI, {
        useNewUrlParser: true
    }).then(db => {
        console.log("db secured")
    })
    .catch(err => {
        console.log(err)
    })

    //swagger options 
    const options={
        definition :{
            openapi:"3.0.0",
            info:{
                title:" Siara Health App", 
                version:"1.0.0",
                description: "The siara api for data collection"
            },
            servers:[
                {
                    url: 'http://localhost:3200/api'
                }
            ]
            
        },
        apis:['./routes/app/*.js']
    }

    const specs = swaggerJsdoc(options)

// serving files as static
App.use(Express.static(path.join(__dirname, 'public')))

//Firebase init
initFireBase()


// Set view engine
App.engine('handlebars', handlebars({defaultLayout:'login', helpers:{select, toggleStatus}}));
App.set('view engine', 'handlebars');

//Use plugins
App.use(Express.urlencoded({
    extended: true
}))
App.use(Express.json())
App.use(fileupload({limits:{fileSize:2*1024*3},}))

//Method
App.use(methodOverride('_method'));





//Session
App.use(cookieParser());
const sessionMiddle = (session({

    secret: 'ajhsbjhafb774364',
    resave: true,
    saveUninitialized: true

}));
App.use(sessionMiddle)


// PASSPORT

App.use(passport.initialize());
App.use(passport.session());

App.use(flash());
App.use(errorHandler)
App.use((req, res, next)=>{

    res.locals.notification = req.notification
    res.locals.user = req.user || null,
    res.locals.message = req.flash('message')
    res.locals.home_message = req.flash('home_message')
    res.locals.error= req.flash('error')
    
    
    next()
    })

//Use Routes

const admin = require('./routes/dashboard/index')
const apihome = require('./routes/router')
const adminAuth = require('./routes/login/index')
App.use('/', apihome)
App.use("/admin",admin)
App.use("/",adminAuth)
App.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


const botName = 'Siara Bot'
let logedInUser;
io.on('connection',  async socket=>{
     
    var userId = await socket.request.session.passport.user;
    await user.findOne({_id:userId}).then(user=>{
        // console.log(user.name)
        return logedInUser = user
    })
    .catch(err=>{
        console.log(err.message)
    })

   
    
   
    socket.emit('user', logedInUser)
    //Welcome current user
    socket.emit('message', formatMessage(botName,' Welcome to Siara Health services '))
    //Broadcast when a user is connectd
    socket.broadcast.emit('message', formatMessage(botName,'this is for all to see except connecting client'))

    //Run disconnect
    socket.on('disconnect', ()=>{
        io.emit('message', formatMessage(botName,'a user have left the chat'))

        //Catch Message
       
    })
    socket.on('chatMessage', (msg)=>{
        io.emit('message',   formatMessage(logedInUser, msg))
    })
 
})

const port = process.env.PORT || 3200;

server.listen(port, () => {

    console.log(`listening on port 3200`);
})