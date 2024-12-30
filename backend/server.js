require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userroutes = require("./routes/UserRoutes");
const app = express();

// Use CORS to allow cross-origin requests
app.use(cors({
    origin: "http://localhost:5173",  // Allow React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Connect to MongoDB Atlas using the connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Set up routes
app.use("/api/user", userroutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the express app for Vercel serverless functions
module.exports = app;