var express = require("express");
var app = express();
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c770aeecb0b8_960.jpg&user=Pexels"},
    {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f0c770aeecb0b8_960.jpg&user=Pexels"},
    {name: "Mountain Goat's Site", image: "https://www.photosforclass.com/download/flickr-2984119099"},
    ]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is in session!");
})