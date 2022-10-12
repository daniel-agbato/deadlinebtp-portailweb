const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

/**
 * Middleware that extract user data from authorization header token
 * and assign it to the request object
 */
const loggedinProtectedRoute = asyncErrorHandler(async (req, res, next) => {
	// Check the headers of the request
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Error("Authentication invalid: no token provided or invalid syntax", StatusCodes.UNAUTHORIZED);
	}

	// extract the token and check it
	const token = authHeader.split(" ")[1];
	if (!token) throw new Error("Authentication invalid: no token provided");

	try {
		// verify and decode the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// get the user with id in the decodedToken
		const user = await User.findById(decodedToken.userId).select("-password");

		// check if the user exist
		if (!user) {
			throw new Error("User not found", StatusCodes.NOT_FOUND);
		}

		// attach the user to the request object so it can be used in other request
		req.user = user;

		next(); // here we call the next middleware
	} catch (err) {
		//console.error(err);
		throw new Error("Authentication invalid: token is invalid", StatusCodes.UNAUTHORIZED);
	}
});

module.exports = loggedinProtectedRoute;
