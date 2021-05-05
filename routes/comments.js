const e = require('express')
//==============================IMPORTS==============================
const express    = require('express'),
      Comment    = require('../models/comment'),
      Campground = require('../models/campground'),
      middlewareObj = require('../middlewares')

//==============================ROUTER==============================
const router = express.Router({
    mergeParams: true
})

//==============================ROUTE MIDDLEWARES==============================
const isLoggedIn  = middlewareObj.isLoggedIn,
      ownsComment = middlewareObj.ownsCampground

//==============================INDEX ROUTE==============================
router.get('/new', isLoggedIn, (req, res) => {
    const campgroundId = req.params.id
    Campground.findById(campgroundId, (err, foundCampground) => {
        if(err){
            res.redirect('/error')
        } else{
            res.render('comments/new',  {campground: foundCampground})
        }
    })
    
})

//==============================CREATE ROUTE==============================
router.post('/', isLoggedIn, (req, res) => {
    const campgroundId = req.params.id,
          comment      = req.body.comment
    
    Campground.findById(campgroundId, (err, foundCampground) => {
        if(err){
            res.redirect('/error')
        } else{
            Comment.create(comment, (err, createdComment) => {
                if(err){
                    req.flash("error", "Unable to add comment, please try again later!")
                    res.redirect('/error')
                } else{
                    createdComment.author.id = req.user._id
                    createdComment.author.username = req.user.username
                    createdComment.save()

                    foundCampground.comments.push(createdComment)
                    foundCampground.save()
                    req.flash("success", "Successfully added a comment")
                    res.redirect(`/campgrounds/${campgroundId}`)
                }
            })
        }
    })
})

//==============================EDIT ROUTE==============================
router.get('/:commentId/edit', ownsComment, (req, res) => {
    const commentId    = req.params.commentId,
          campgroundId = req.params.id
    Comment.findById(commentId, (err, foundComment) => {
        if(err || !foundComment){
            req.flash("error", "Comment not found")
            res.redirect('/error')
        } else{
            Campground.findById(campgroundId, (err, foundCampground) => {
                if(err || !foundCampground){
                    req.flash("error", "Campgroun not found")
                    res.redirect('/error')
                } else {
                    res.render('comments/edit', {
                        comment: foundComment,
                        campground: foundCampground
                    })
                }
            })
        }
    })
})

//==============================UPDATE ROUTE==============================
router.put('/:commentId', ownsComment, (req, res) => {
    const commentId    = req.params.commentId,
          newComment   = req.body.comment,
          campgroundId = req.params.id
    Comment.findByIdAndUpdate(commentId, newComment, (err, updatedComment) => {
        if(err){
            res.reditect('/error')
        } else{
            res.redirect(`/campgrounds/${campgroundId}`)
        }
    })
})

//==============================DESTROY ROUTE==============================
router.delete('/:commentId', ownsComment, (req, res) => {
    const commentId    = req.params.commentId,
          campgroundId = req.params.id

    Comment.findByIdAndRemove(commentId, (err) => {
        if(err){
            res.redirect('/error')
        } else{
            Campground.findById(campgroundId, (err, foundCampground) => {
                if(err){
                    res.redirect('/error')
                } else{
                    deletedCommentIndex = foundCampground.comments.indexOf(commentId)
                    foundCampground.comments.splice(deletedCommentIndex, 1)
                    foundCampground.save()
                    req.flash("success", "Successfuly deleted comment")
                    res.redirect(`/campgrounds/${campgroundId}`)
                }
            })
        }
    })
})

//==============================EXPORTS==============================
module.exports = router