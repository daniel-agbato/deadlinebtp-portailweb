const { StatusCodes } = require("http-status-codes");

/**
 * Custom error handler
 *
 * @param {*} err contain all the previous error catched
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next function to call next middleware
 * @returns json object
 */
const customErrorHandler = (err, req, res, next) => {
	//console.log(err);
	let customErrorResponse = {
		// default values
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong, please try again later.",
	};

	// Check for duplicate/already use value
	if (err.code && err.code === 11000) {
		customErrorResponse.msg = `${Object.keys(err.keyValue)} field: '${Object.values(
			err.keyValue
		)}' is already taken, please provide another value.`;
		customErrorResponse.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.name === "ValidationError") {
		// Here we transform the errors object cathed to a string with each errors message
		customErrorResponse.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(", ");
		customErrorResponse.statusCode = StatusCodes.BAD_REQUEST;
	}

	// We get the stack from the error when in development mode to display it
	const stack = process.env.NODE_ENV !== "production" && err.stack;

	return res.status(customErrorResponse.statusCode).json({ success: false, msg: customErrorResponse.msg, stack });
};

module.exports = customErrorHandler;
