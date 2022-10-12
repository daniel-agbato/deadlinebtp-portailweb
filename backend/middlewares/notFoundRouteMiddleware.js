const { StatusCodes } = require("http-status-codes");

/**
 *Middleware for managing not found url request
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(StatusCodes.NOT_FOUND);
	next(error);
};

module.exports = notFound;
