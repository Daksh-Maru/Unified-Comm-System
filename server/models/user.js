const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // Makes a Collection in a database.
    name: { type: String, required: true },
    email: String,
    username: String,
});

module.exports = mongoose.model("user", userSchema);
