var mongoose = require("mongoose");

var TasksSchema = new mongoose.Schema({
    taskdetails: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var TaskModel = mongoose.model("Task", TasksSchema);
module.exports = TaskModel;