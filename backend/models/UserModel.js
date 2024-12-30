const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    likedMovies: [
        {
            id: Number,
            name: String,
            image: String,
            genres: [String],
        }
    ],
});


module.exports = mongoose.model("User", UserSchema);
