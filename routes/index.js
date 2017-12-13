
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//route takes you to the landing/home pagee
router.get("/", function(req, res) {
    res.render("landing");
});

//route will take you to profile page
router.get("/profile", function(req, res) {
    res.render("profile");
});


/////auth routes/////

router.get("/register", function(req, res) {
    res.render("register");
});
//register route for creating  new user
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    var profileImage = req.body.profileImage;
    User.register(newUser, req.body.password, profileImage: image, function(err, user) {
        if (err) {
            req.flash("error",err.message);
            console.log(err)
            //if registration did not work render the register page again
            return res.redirect("register");
        }
        //if registration went through, render the campgrounds page
        passport.authenticate("local")(req, res, function() {
             req.flash("success","sucess , Welcome to yelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });

});


//show log in form//
router.get("/login", function(req, res) {
    res.render("login");
});

//post log in //
router.post("/login", passport.authenticate("local", //have middleware here
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",

    }), function(req, res) {//callback left empty, never gets here
});

//logout  route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!")
   res.redirect("/campgrounds");
});

//auth routes/////




module.exports  = router;
