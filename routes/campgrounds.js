

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");





//INITIAL ROUTE
router.get("/", function(req, res) {

    //get all campgrounds from DB
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
        }
    });
});

//GET FORM FOR NEW CAMPGROUND
router.get("/new",middleware.isLoggedin, function(req, res) {
    res.render("campgrounds/new");
});

//CREATE/POST NEW CAMPGROUND
router.post("/", middleware.isLoggedin, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id  ,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: description, author: author }// each new campground associated with author
    //create a new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("found template")
            res.redirect("/campgrounds");
        }
    });
});




// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
           // console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});



// // SHOW - shows more info about one campground    //why does this route not work??
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground)
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// });



//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCamprGroundOwnsership, function(req,res){

     Campground.findById(req.params.id, function (err, foundCampground){
         res.render("campgrounds/edit", {campground: foundCampground});
     });
});



//UPDATE CAMPGRPOUND ROUTE
router.put("/:id",middleware.checkCamprGroundOwnsership, function(req, res){
    
    //find and update the correct campground
Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
          res.redirect("/campgrounds/" + req.params.id);
        }
    });    
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCamprGroundOwnsership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});









//EXPORT TO ROUTE PAGES
module.exports  = router;
