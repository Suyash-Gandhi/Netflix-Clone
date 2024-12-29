const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userroutes= require("./routes/UserRoutes")
const app =express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/netflix-database")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/user",userroutes)

app.listen(5000,console.log("server started"))