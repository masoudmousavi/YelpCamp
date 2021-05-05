//==============================IMPORTS==============================
const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      flash           = require('connect-flash'),
      passport        = require('passport'),
      passportLocal   = require('passport-local'),
      expressSession  = require('express-session'),
      methodOverride  = require('method-override'),
      User            = require('./models/user'),
      seedDatabase    = require('./seeds')
//==============================SEED DB==============================
// seedDatabase()

//==============================ROUTES IMPORTS==============================
const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments'),
      indexRoutes      = require('./routes/index')

//==============================EXPRESS APP==============================
const app = express()

//==============================SERVER ADDRESSING==============================
const address = 3000//port 3000 on localhost

//==============================DATABASE CONNECTION==============================
mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//==============================SESSIONS CONFIG==============================
app.use(expressSession({
    secret: 'Led Zeppelin is the best',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//==============================BODY-PARSER CONFIG==============================
app.use(bodyParser.urlencoded({extended: true}))

//==============================METHOD-OVERRIDE CONFIG==============================
app.use(methodOverride('_method'))

//==============================FLASH CONFIG==============================
app.use(flash())

//==============================PUBLIC DIR CONFIG==============================
app.use(express.static(__dirname + '/public'))

//==============================RES.LOCALS CONFIG==============================
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

//==============================ROUTES CONFIG==============================
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use(indexRoutes)

//==============================AUTHENTICATE MIDDLEWARE==============================
passport.use(new passportLocal(User.authenticate()))

//==============================PASSPORT ENC/DEC CONFIG==============================
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//==============================VIEW ENGINE CONFIG==============================
app.set('view engine', 'ejs')

//==============================TEST==============================


//==============================SERVER SET-UP==============================
app.listen(address, () => {
    console.log(`The YelpCamp-Server is listening for requests on address ${address}`)
})
