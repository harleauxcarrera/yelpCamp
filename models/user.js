var mongoose  =require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    profileImage: String
});
UserSchema.plugin(passportLocalMongoose);//adds methods to user from passport
module.exports = mongoose.model("User", UserSchema);
