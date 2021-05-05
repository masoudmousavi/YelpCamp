//==============================IMPORTS==============================
const express       = require('express'),
      User          = require('../models/user'),
      passport      = require('passport'),
      middlewareObj = require('../middlewares')

//==============================ROUTER==============================
const router = express.Router()

//==============================ROUTE MIDDLEWARES==============================
const isLoggedIn = middlewareObj.isLoggedIn

//==============================ROOT ROUTE==============================
router.get('/', (req, res) => {
    res.render('landing')
})

//==============================SIGN-UP FORM ROUTE==============================
router.get('/register', (req, res) => {
    res.render('auth/register')
})

//==============================SIGN-UP ROUTE==============================
router.post('/register', (req, res) => {
    const username    = req.body.username,
          password    = req.body.password,
          newUser = new User({username: username})
    User.register(newUser, password, (err, registerdUser) => {
        if(err){
            req.flash("error", err.message)
            res.redirect('/register')
        } else{
            passport.authenticate('local')(req, res, () => {
                req.flash("success", `Successfully registered as ${req.user.username}`)
                res.redirect('/campgrounds')
            })
        }
    })
})

//==============================LOGIN FORM ROUTE==============================
router.get('/login', (req, res) => {
    res.render('auth/login')
})

//==============================LOGIN ROUTE==============================
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
})

//==============================LOGOUT ROUTE==============================
router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success", "You are logged out!")
    res.redirect('/campgrounds')
})

//==============================ERROR ROUTE==============================
router.get('/error', (req, res) => {
    res.send('Something went wrong. Try again please!')
})

//==============================EXPORTS==============================
module.exports = router