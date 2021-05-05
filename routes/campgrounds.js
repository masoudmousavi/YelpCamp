const e = require('express')
//==============================IMPORTS==============================
const express       = require('express'),
      Campground    = require('../models/campground'),
      middlewareObj = require('../middlewares')


//==============================ROUTER==============================
const router = express.Router()

//==============================ROUTE MIDDLEWARES==============================
const isLoggedIn     = middlewareObj.isLoggedIn,
      ownsCampground = middlewareObj.ownsCampground

//==============================INDEX ROUTE==============================
router.get('/', (req, res) => {
    Campground.find({}, (err, foundCampgrounds) => {
        if(err){
            res.redirect('/error')
        } else{
            res.render('campgrounds/index', {campgrounds: foundCampgrounds})
        }
    })
})

//==============================CREATE ROUTE==============================
router.post('/', isLoggedIn, (req, res) => {
    const campground = req.body.campground
    
    Campground.create(campground, (err, createdCampground) => {
        if(err){
            res.redirect('/error')
        } else{
            createdCampground.creator.id = req.user._id
            createdCampground.creator.username = req.user.username
            createdCampground.save()

            res.redirect('/campgrounds')
        }
    })
})

//==============================NEW ROUTE==============================
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

//==============================SHOW ROUTE==============================
router.get('/:id', (req, res) => {
    const campgroundId = req.params.id
    Campground.findById(campgroundId)
    .populate('comments')
    .exec((err, foundCampground) => {
        if(err || !foundCampground){
            req.flash('error', 'Campground not found')
            res.redirect('/error')
        } else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//==============================EDIT ROUTE==============================
router.get('/:id/edit', ownsCampground, (req, res) => {
    const campgroundId = req.params.id
    Campground.findById(campgroundId, (err, foundCampground) => {
        if(err){
            res.redirect('/error')
        } else{
            res.render('campgrounds/edit', {campground: foundCampground})
        }
    })
})

//==============================UPDTAE ROUTE==============================
router.put('/:id', ownsCampground, (req, res) => {
    const campgroundId  = req.params.id,
          newCampground = req.body.campground
    Campground.findByIdAndUpdate(campgroundId, newCampground, (err, updatedCampground) => {
        if(err){
            res.redirect('/error')
        } else{
            res.redirect(`/campgrounds/${campgroundId}`)
        }
    })
})

//==============================DESTROY ROUTE==============================
router.delete('/:id', ownsCampground,  (req, res) => {
    const campgroundId = req.params.id
    Campground.findByIdAndRemove(campgroundId, (err) => {
        if(err){
            res.redirect('/error')
        } else {
            res.redirect('/campgrounds')
        }
    })
})

//==============================EXPORTS==============================
module.exports = router