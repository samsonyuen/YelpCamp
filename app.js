var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Creek", image: "http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg"},
    {name: "Granite Hill", image: "http://www.woodallscm.com/wp-content/uploads/2018/04/Sawnee-Campground.jpg"},
    {name: "Mountain Goat's Site", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
    {name: "Salmon Creek", image: "http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg"},
    {name: "Granite Hill", image: "http://www.woodallscm.com/wp-content/uploads/2018/04/Sawnee-Campground.jpg"},
    {name: "Mountain Goat's Site", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
    {name: "Granite Hill", image: "http://www.woodallscm.com/wp-content/uploads/2018/04/Sawnee-Campground.jpg"},
    {name: "Mountain Goat's Site", image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"}
    ]

app.get("/", function(req, res){
    res.render("landing");
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is in session!");
});