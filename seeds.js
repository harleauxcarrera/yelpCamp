
//used to seed the database for testing purposes
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data=[
    
    {
            name: "Charlie",
            image: "https://farm1.staticflickr.com/472/30962727454_f8ddd02de7.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    
    {
            name: "Charlie",
            image: "https://farm2.staticflickr.com/1540/24243305535_ea7a2c977d.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    
    {
            name: "Charlie",
            image: "https://farm6.staticflickr.com/5211/5383973956_9dc8227a86.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    }
]

var comments = [
    
    ]
    
function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("removed campgrounds!")
        }

        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("added a campgrounds");
                    Comment.create(

                        {
                            text: "I wish i was dead",
                            author: "Charlie",
                        },
                        function(err, comment) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("added a new comment!")
                            }
                        })
                }
            })
        })
    });
}//function seedDB


//add some campgrounds


module.exports = seedDB; //file returns this function in order to be used in app.js