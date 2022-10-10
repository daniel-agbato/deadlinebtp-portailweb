const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const asyncErrorHandler = require("express-async-handler"); // Pass all the catched errors to the custom error handler middleware

/**
 * Register a new user
 *
 * @return user created data as a json object
 */
const registerUser = asyncErrorHandler(async (req, res) => {
	// retrieve the value sent with the request
	const { pseudo, nom, prenom, adresse, email, tel, password } = req.body;

	// create a new user
	const user = await User.create({ pseudo, nom, prenom, adresse, email, tel, password });

	// We generate a new token
	const token = await user.createNewToken();

	// data to return
	const data = _.pick(user, ["_id", "pseudo", "nom", "prenom", "adresse", "email", "tel", "createdAt"]);

	return res.status(StatusCodes.CREATED).json({ ...data, token });
});

/**
 * Login user
 *
 * @return user data as a json object
 */
const authUser = asyncErrorHandler(async (req, res) => {
	// retrieve the value sent with the request
	const { email, password } = req.body;

	// check the credentials provided
	if (!email || !password) {
		throw new Error("Please you must provide a email and password", StatusCodes.BAD_REQUEST);
	}

	// get the user with that email
	const user = await User.findOne({ email });

	// check if a user is found
	if (!user) {
		throw new Error("No user found with that email", StatusCodes.UNAUTHORIZED);
	}

	// we compare the password entered with the user found password
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		throw new Error("The password is invalid", StatusCodes.UNAUTHORIZED);
	}

	// We generate a new token
	const token = await user.createNewToken();

	// data to return
	const data = _.pick(user, ["_id", "pseudo", "nom", "prenom", "adresse", "email", "tel", "createdAt"]);

	return res.status(StatusCodes.OK).json({ ...data, token });
});

module.exports = { registerUser, authUser };
