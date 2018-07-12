var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SCHEMA SETUP

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
            res.redirect("/campgrounds");
            console.log(campground);
        }
    });
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

//==================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   // look up campground using ID
   Campground.findById(req.params.id, function(err, campground){
      if (err){
          console.log(err);
          res.redirect("/campgrounds");
      } 
      else {
          Comment.create(req.body.comment, function(err, comment){
              if (err){
                  console.log(err);
              }
              else {
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
});

//AUTH

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is in session!");
});