const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const asyncErrorHandler = require("express-async-handler"); // Pass all the catched errors to the custom error handler middleware
const pickDataToReturn = require("../utils/pickDataToReturn");

/**
 * Register a new user
 *
 * @return user created data as a json object
 */
const registerUser = asyncErrorHandler(async (req, res) => {
	// retrieve the values sent with the request
	const { pseudo, lastname, firstname, address, email, phone, password } = req.body;

	// create a new user
	const user = await User.create({ pseudo, lastname, firstname, address, email, phone, password });

	// We generate a new token
	const token = await user.createNewToken();

	// data to return
	const data = pickDataToReturn(user);

	return res.status(StatusCodes.CREATED).json({ success: true, results: { ...data, token } });
});

/**
 * Login user
 *
 * @return user data as a json object
 */
const authUser = asyncErrorHandler(async (req, res) => {
	// retrieve the values sent with the request
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
	const data = pickDataToReturn(user);

	return res.status(StatusCodes.OK).json({ success: true, results: { ...data, token } });
});

/**
 * update user profile
 *
 * @return updated user data as a json object
 */
const updateUserProfile = asyncErrorHandler(async (req, res) => {
	// retrieve the values sent with the request
	const { address, email } = req.body;

	// get the user logged in from the request object
	const user = req.user;

	if (user) {
		user.address = address || user.address;
		user.email = email || user.email;

		// we save the updated fields
		const updatedUser = await user.save();

		// data to return
		const data = pickDataToReturn(updatedUser);

		return res.status(StatusCodes.OK).json({ success: true, results: { ...data } });
	} else {
		throw new Error("User not found", StatusCodes.NOT_FOUND);
	}
});

/**
 * delete user profile/account
 *
 * @return success delete message as json object
 */
const deleteUserProfile = asyncErrorHandler(async (req, res) => {
	// get the user logged in from the request object
	const user = req.user;

	await user.remove();
	return res.status(StatusCodes.OK).json({ success: true, msg: "User account removed successfully" });
});

module.exports = { registerUser, authUser, updateUserProfile, deleteUserProfile };
