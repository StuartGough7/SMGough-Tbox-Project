var mongoose = require("mongoose");

var PhotosSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

var PhotoModel = mongoose.model("Photo", PhotosSchema);
module.exports = PhotoModel;