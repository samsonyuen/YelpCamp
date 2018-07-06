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
    image: String
})

var Campground = mongoose.model("CampGround", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name: name, image: image}
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

app.get("/campgrounds", function(req, res){
    Campground.find({}, function (err, allCampgrounds){
       if (err){
           console.log (err);
       } 
       else {
           res.render("campgrounds", {campgrounds: allCampgrounds})
       }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is in session!");
});