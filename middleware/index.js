//all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObject = {};


middlewareObject.checkCamprGroundOwnsership = function(req, res, next){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function (err, foundCampground){
                if(err){
                     req.flash("error","Campground not found");
                    res.redirect("/campgrounds")
                 }else{
                    //does the user match the author id ??
                if(foundCampground.author.id.equals(req.user.id)){
                        next();
                }else{
                     req.flash("error","You dont have permission to do that!");
                    res.send("back");
                    }
                }
             });
    }else{
         req.flash("error","You need to be logged to edit the campground");
        res.redirect("/login");
        }
};//checkCampgroundOwnership


middlewareObject.checkCommentOwnership = function (req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               //console.log(foundComment.author);
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                
                next();
                
            } else {
                req.flash("error","You do not have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        //if user is not logged in:
         req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
};//checkCommentOwnership



middlewareObject.isLoggedin = function(req, res, next){      ///use as middleware in every route where the user has to be logged in to perform that route
    if(req.isAuthenticated()){
        return next();
    }
        // if not authenticated (not logged in redirect to log in and flash message)
        req.flash("error","You need to be logged in to do that!");
        res.redirect("/login");
       
};

    
    
    



module.exports = middlewareObject;