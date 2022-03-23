const mongoose = require("mongoose");

let connectionString = "mongodb://localhost:27017/project1";

mongoose.connect(connectionString);

module.exports= mongoose;