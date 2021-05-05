const mongoose   = require("mongoose"),
      Campground = require('./models/campground')
      Comment    = require('./models/comment')
      User       = require('./models/user')

var seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
function seedDB(){
    //delete everything from the database
    Comment.deleteMany({}, (err) => {
        // if(!err){
        //     Campground.deleteMany({}, (err) => {
        //         if(!err){
        //             console.log('Database was wiped out')
        //              //add some placeholder campgrounds to the database
        //             for(cg of campgrounds){
        //                 Campground.create(cg, (err, createdCampground) => {
        //                     if(!err){
        //                     console.log(createdCampground)
        //                     //create a comment for each campground
        //                     Comment.create({
        //                         text: `${cg.name} is just great`,
        //                         author: 'Masoud M'}, 
        //                         (err, createdComment) => {
        //                             if(!err){
        //                                 createdCampground.comments.push(createdComment)
        //                                 createdCampground.save()
        //                                 console.log(createdComment)
        //                             }
        //                     })
        //                     }   
        //                 })
        //             }
        //         }
        //     })
        // }
    })  
}

async function seedDB2(){
    await Campground.deleteMany({})
    await Comment.deleteMany({})
    await User.deleteMany({})
    console.log('campgrounds and comments were removed')

    // for (seed of seeds){
    //     let createdCampground = await Campground.create(seed)
    //     console.log('a campground was created')
    //     let createdComment = await Comment.create({
    //         text: `${seed.name} is just a nice place`,
    //         author: 'Masoud M'
    //     })
    //     console.log('a comment was created')
    //     createdCampground.comments.push(createdComment)
    //     let savedCampground = await createdCampground.save()
    //     console.log('comment was associated to a campground')
    // }
}

module.exports = seedDB2

