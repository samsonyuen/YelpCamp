var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("CampGround", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

// CREATE - add new campground to DB
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description}
    Campground.create(newCampGround, function (err, campground){
    if (err){
        console.log(err);
    } 
    else {
        console.log("Created: ");
        console.log(campground);
    }
});
    res.redirect("/campgrounds");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function (err, allCampgrounds){
       if (err){
           console.log (err);
       } 
       else {
           res.render("index", {campgrounds: allCampgrounds})
       }
    });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    // render show template 
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else {
            res.render("show", {campground: foundCampground});
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is in session!");
});