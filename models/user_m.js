var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

UserSchema.plugin(passportLocalMongoose);                                       //Adds all passport functions to teh schema

module.exports = mongoose.model("User", UserSchema);