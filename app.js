  ////////////////Vars////////////////////
var express = require("express"); // to import the express package
var app = express(); // initialize express packages
var mongoose = require("mongoose"); //intialize mongoose
var passport = require("passport");//package for authentication
var LocalStrategy = require("passport-local");//package for authentication
var Campground = require("./models/campground");//Campground model require
var seedDB = require("./seeds");//seed file for testing
var Comment = require("./models/comment");//require comment model
var User = require("./models/user");//require user model
var bodyParser = require("body-parser");//require body parser package
var methodOverride = require("method-override");
var flash = require("connect-flash");//flash messages

//requiring external file routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

///////////Required/////////////////////

//seedDB(); //clean DB and add three hardcodes campgrounds
mongoose.Promise = global.Promise; //required

mongoose.connect(process.env.DATABASEURL);//check to see if env vvar was made
//use local instance of mongodb (seperate db than deployment version on heroku)
//mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true }); //connect to DB and make yelp_camp DB
//create env variable (create new env var in the command line : export NAME= "url")

//mongoose.connect("mongodb://harleauxcarrera:please313@ds111638.mlab.com:11638/mockyelpcamp");
app.set("view engine", "ejs"); // to avoid ending all files with '.ejs'node.
app.use(bodyParser.urlencoded({ extended: true })); //required
app.use(express.static(__dirname + "/public")); //to serve main.css in /public
//middleware to pass current user everytime page renders in each and every route
app.use(methodOverride("_method"));
app.use(flash());//flash messages!
///////////Required/////////////////////


/////////Passport config///////////////
app.use(require("express-session")({
    secret: "once again rsuty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/////////Passport config///////////////

//make every route have currentUser/message
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//to link to external route files//
app.use( "/", indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds" ,campgroundRoutes);


////////////////////////Code required to start the server//////////////////

//changed the port
app.listen(process.env.PORT || 3000, function(){
  console.log('app running at port 3000...');
});
	console.log("the server has started");

////////////////////////Code required to start the server//////////////////
