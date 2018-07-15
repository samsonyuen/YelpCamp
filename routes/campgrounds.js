var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();

// CREATE - add new campground to DB
router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGround = {name: name, image: image, description:description, author:author}
    Campground.create(newCampGround, function (err, campground){
        if (err){
            console.log(err);
        } 
        else {
            res.redirect("/campgrounds");
            console.log(campground);
        }
    });
});

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function (err, allCampgrounds){
       if (err){
           console.log (err);
       } 
       else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds})
       }
    });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - show more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    // render show template 
    var id = req.params.id;
    // populate here or else we'll only get object ids.
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE

// UPDATE CAMPGROUND ROUTE

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;