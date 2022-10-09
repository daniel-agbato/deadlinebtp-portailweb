// dotenv allow to use .env variables through all the files
require("dotenv").config();
require("colors");
const path = require("path");

// Initialize express app
const express = require("express");
const app = express();

const morgan = require("morgan");

// Connect the DB
const connectDB = require("./config/mongo");
connectDB();

// ===== ROUTERS ===== //

// ===== MIDDLEWARES ===== //
app.use(morgan("tiny"));
app.use(express.json());

// ===== ROUTES ===== //
app.get("/api/v1/", (req, res) => {
	res.send("API is running");
});

// ===== ERRORS HANDLERS ===== //

// ===== SERVER INITIALIZATION ===== //
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
