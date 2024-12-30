const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user
            const moviesAlreadyLiked = likedMovies.some(({ id }) => id === data.id)
            if (!moviesAlreadyLiked) {
                likedMovies.push(data);
                await user.save();  // Explicitly save the updated user
                return res.json({ msg: "Movie successfully added to database." }
                )

            } else return res.json({ msg: "Movie already added to the liked list." })

        }  else {
            const newUser = new User({ email, likedMovies: [data] });
            await newUser.save();
            return res.json({ msg: "Movie successfully added to my list." });
        }
        

    } catch (error) {
        console.log(error);
        

    }
}

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params
        const user = await User.findOne({ email })
        if (user) {
            res.json({ msg: "success", movies: user.likedMovies })
        } else return res.json({ msg: "User with given email not found." })
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching movie", error: err.message });

    }
}

module.exports.removeLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        
        if (user) {
            const { likedMovies } = user;
            const movieindex = likedMovies.findIndex(({ id }) => id === movieId);
            
            if (movieindex === -1) {
                return res.status(400).send({ msg: "Movie not found" });
            }

            likedMovies.splice(movieindex, 1);  // Remove the movie from the array

            await User.findByIdAndUpdate(
                user.id,
                { likedMovies },  // Update with modified list
                { new: true }
            );
            
            return res.json({ msg: "Movie successfully removed", movies: likedMovies });
        } else {
            return res.status(404).send({ msg: "User not found" });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Error deleting movie", error: err.message });
    }
};

    
