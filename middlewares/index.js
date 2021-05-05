//==============================IMPORTS==============================
const Campground = require('../models/campground'),
      Comment    = require('../models/comment')

//==============================MIDDLEWARE OBJECT==============================
const middlewareObj = {
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", "You need to be logged in to do that!")
        res.redirect('/login')
    },
    ownsCampground: (req, res, next) => {
        const campgroundId = req.params.id
        if(req.isAuthenticated()){
            const userId = req.user._id
            Campground.findById(campgroundId, (err, foundCampground) => {
                if(err || !foundCampground){
                    req.flash("error", "Campground not found")
                    res.redirect('back')
                } else{
                    if(foundCampground.creator.id.equals(userId)){
                        next()
                    } else{
                        req.flash("error", "You do not have permission to do that")
                        res.redirect('back')
                    }
                }
            })
        } else{
            req.flash("error", "You need to be logged in to do that")
            res.redirect('back')
        }
    },
    ownsComment: (req, res, next) => {
        const commentId = req.params.commentId
        if(req.isAuthenticated()){
            const userId = req.user._id
            Comment.findById(commentId, (err, foundComment) => {
                if(err || !foundComment){
                    req.flash("error", "comment not found")
                    res.redirect('back')
                } else{
                    if(foundComment.author.id.equals(userId)){
                        next()
                    } else{
                        req.flash("You do not have permission to do that")
                        res.redirect('back')
                    }
                }
            })
        } else{
            req.flash("error", "You need to be logged in to do that")
            res.redirect('back')
        }
    }
}

//==============================EXPORTS==============================
module.exports = middlewareObj