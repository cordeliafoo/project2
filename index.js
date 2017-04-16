var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var mongoose = require('mongoose')
var ejsLayouts = require('express-ejs-layouts')
var methodOverride = require('method-override')
var passport = require('./config/passportconfig')

require('dotenv').config({silent: true})

// initialize app
var app = express()

// connect to database
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/project2'
mongoose.connect(dbURI)
mongoose.Promise = global.Promise

// check if our database connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we are connected
  console.log('we are really connected to database')
})

// set up the layout file
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// set up static folders
app.use(express.static(path.join(__dirname, 'public')))

// set up body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cookieParser())

// set up the method override method
app.use(methodOverride('_method'))

// set up express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'SOUFFLE',
  resave: false,
  saveUnintialized: true
}))

// set up flash middleware
app.use(flash())
app.use(function (req, res, next) {
  // this middleware will call on every request and set the req.flash() value.
  // res.locals.message is used here to get the req.flash() values on the current age without having to refresh page
  res.locals.message = req.flash()
   // passport fills the req.user object with the current user
  res.locals.currentUser = req.user
  next()
})
// passport initialization
app.use(passport.initialize())
app.use(passport.session())

// set up the routes
var authRouter = require('./routes/authRouter')
var userRouter = require('./routes/userRouter')
var eventRouter = require('./routes/eventRouter')
app.get('/', function(req, res){
  res.redirect('/auth/login')
})
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/event', eventRouter)

// set the port
var port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('app is running at ' + port)
})
