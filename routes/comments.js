var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");





//new comment form GET data
router.get("/new", middleware.isLoggedin, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    })

});


//POSTS/CREATES new comment                  //isLoggeinIn Middleware//
router.post("/", middleware.isLoggedin, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds");
        }
        else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log("error adding comment")
                }
                else {
                   
                    //add username and id to comment 
                    comment.author.id = req.user._id;
                     //console.log(comment.author.id);
                    // console.log(req.user._id);
                    comment.author.username = req.user.username;
                  
                    //save comment 
                    comment.save();
                    
                    //connect new comment to campground
                    campground.comments.push(comment)
                    campground.save();
                    
                    //send flash alert that comment was succesfully added
                     req.flash("success","Comment succesfully added!");
                    //redirect to campgrounds show page
                    res.redirect('/campgrounds/' + campground.id);
                }
            })
        }

    });
});


//EDIT COMMENT 
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back")
       } else{
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
       }
    });
   
});

// COMMENT UPDATE
router.put("/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});


//DESTROY COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
          }else{
               req.flash("success","Comment deleted!");
              res.redirect("/campgrounds/" + req.params.id);
          }
  });
});

// COMMENT DESTROY ROUTE why does this not work?
// router.delete("/:comment_id", function(req, res){
//     //findByIdAndRemove
//     Comment.findByIdAndRemove(req.params.comment_id, function(err){
//       if(err){
//           res.redirect("back");
//       } else {
//           res.redirect("/campgrounds/" + req.params.id);
//       }
//     });
// });



    









module.exports = router;