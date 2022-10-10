const mongoose = require("mongoose");

/**
 * @desc Initialize the connection to the Database
 *
 * @returns void
 */
const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log("Mongo Database Connected!".green.bold);
	} catch (err) {
		console.error(`Error: ${err.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;
