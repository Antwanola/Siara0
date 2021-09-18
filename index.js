const Express = require('express')
const handlebars = require('express-handlebars')
const App = Express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const {select} = require('./helpers/generalHelpers')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const socketio = require('socket.io')
const errorHandler=  require('./helpers/errorHandler')
const http = require('http')
const formatMessage = require('./utils/message')

const server = http.createServer(App)
const io = socketio(server)



mongoose.connect("mongodb+srv://antwan:comodor29@cluster0.ncriv.mongodb.net/Siara?retryWrites=true&w=majority", {
        useNewUrlParser: true
    }).then(db => {
        console.log("db secured")
    })
    .catch(err => {
        console.log(err)
    })

// serving files as static
App.use(Express.static(path.join(__dirname, 'public')))


const botName = 'Siara Bot'
io.on('connection', socket=>{
    console.log(`we connected to socket `)
    
    
    
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
        io.emit('message',   formatMessage('USER', msg))
    })

})
// Set view engine
App.engine('handlebars', handlebars({defaultLayout:'login', helpers:{select}}));
App.set('view engine', 'handlebars');


//Method
App.use(methodOverride('_method'));


//Use plugins
App.use(Express.urlencoded({
    extended: true
}))
App.use(Express.json())
App.use(Express.json())


//Session
App.use(cookieParser());
App.use(session({

    secret: 'ajhsbjhafb774364',
    resave: true,
    saveUninitialized: true

}));


// PASSPORT

App.use(passport.initialize());
App.use(passport.session());

App.use(flash());
App.use(errorHandler)
App.use((req, res, next)=>{
  
    res.locals.user = req.user || null,
    res.locals.message = req.flash('message')
    res.locals.home_message = req.flash('home_message')
    res.locals.error= req.flash('error')
    console.log(req.user)
    
    next()
    })

//Use Routes

const admin = require('./routes/dashboard/index')
const apihome = require('./routes/router')
const adminAuth = require('./routes/login/index')
App.use('/', apihome)
App.use("/admin",admin)
App.use("/",adminAuth)



const port = process.env.PORT || 3200;

server.listen(port, () => {

    console.log(`listening on port 3200`);
})
