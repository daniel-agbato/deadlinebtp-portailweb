// dotenv allow to use .env variables through all the files
require("dotenv").config();
require("colors");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const customErrorHandler = require("./middlewares/errorHandlerMiddleware");
const notFound = require("./middlewares/notFoundRouteMiddleware");
const swaggerDocs = require("./documentation/swagger");

// Initialize express app
const express = require("express");
const app = express();

// Connect the DB
const connectDB = require("./config/mongo");
connectDB();

// ===== MIDDLEWARES ===== //
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// ===== ROUTERS ===== //
const userRouter = require("./routes/userRoutes");

// ===== ROUTES ===== //
app.get("/api/v1", async (req, res) => {
	return res.send("API is running!");
});
app.use("/api/v1/user", userRouter);

// Generate documentation with swagger
swaggerDocs(app);

// ===== APP CONFIGURATION ===== //
const __root_dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(__root_dirname + "/client/build"));
}

// ===== ERRORS HANDLERS ===== //
app.use(notFound);
app.use(customErrorHandler);

// ===== SERVER INITIALIZATION ===== //
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
