const { StatusCodes } = require("http-status-codes");

const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(StatusCodes.NOT_FOUND);
	next(error);
};

module.exports = notFound;
