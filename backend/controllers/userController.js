const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const asyncErrorHandler = require("express-async-handler"); // Pass all the catched errors to the custom error handler middleware

/**
 * Register a new user
 *
 * @returns response as a json object
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

	res.status(StatusCodes.CREATED).json({ ...data, token });
});

module.exports = { registerUser };
