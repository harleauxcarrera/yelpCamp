var mongoose = require("mongoose");//mongoose is a package that lets us use mongodb easier
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});//connect to db cat_app
//adding a new cat to the db

//how to create a cat Schema/Object 
var catSchema = new mongoose.Schema({
    
    name: String, 
    age: Number, 
    attitude: String
});
//This is used in mongoose to 'model' a cat using the catSchema we just made up top
//which after saving to a var, in this case 'Cat', you can use the built in methods on the var Cat
var Cat = mongoose.model("Cat", catSchema);

//create var of cat to add new cat
var georgie = new Cat({
    name: "Georgie",
    age: 11,
    attitude: "Bitchy"
});
//save to database (make sure the MonogDB is runnin in another terminal)
georgie.save(function(err, cat){
    
    if(err){
        console.log("Something went wrong")
    }else{
        console.log("WE jst saved a cat to the DB")
        console.log(cat);
    }
});

//retrieve each cat from the db and consol.log that shit

