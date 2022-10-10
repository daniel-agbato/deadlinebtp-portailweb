// dotenv allow to use .env variables through all the files
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const customErrorHandler = require("./middlewares/errorHandlerMiddleware");
const notFound = require("./middlewares/notFoundRouteMiddleware");

// Initialize express app
const express = require("express");
const app = express();

// Connect the DB
const connectDB = require("./config/mongo");
connectDB();

// ===== ROUTERS ===== //
const userRouter = require("./routes/userRoutes");

// ===== MIDDLEWARES ===== //
app.use(morgan("tiny"));
app.use(express.json());

// ===== ROUTES ===== //
app.get("/api/v1", async (req, res) => {
	return res.send("API is running!");
});

app.use("/api/v1/user", userRouter);

// ===== ERRORS HANDLERS ===== //
app.use(notFound);
app.use(customErrorHandler);

// ===== SERVER INITIALIZATION ===== //
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
