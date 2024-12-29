const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    likedMovies: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("User", UserSchema);
