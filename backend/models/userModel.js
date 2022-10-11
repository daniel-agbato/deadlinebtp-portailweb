const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* 
User Model with the following properties:
- pseudo
- nom
- prénom
- adresse
- email
- tel
- password
*/

const UserSchema = new mongoose.Schema(
	{
		pseudo: {
			type: String,
			required: [true, "Please you must provide a pseudo"],
			minLength: [2, "Your pseudo must be at least 2 characters"],
			maxLength: [100, "Your pseudo can't have more than 100 characters"],
			trim: true,
		},
		lastname: {
			type: String,
			required: [true, "Please you must provide a lastname"],
			minLength: [2, "Your lastname must be at least 2 characters"],
			maxLength: [100, "Your lastname can't have more than 100 characters"],
			trim: true,
		},
		firstname: {
			type: String,
			required: [true, "Please you must provide a firstname"],
			minLength: [2, "Your firstname must be at least 2 characters"],
			maxLength: [100, "Your firstname can't have more than 100 characters"],
			trim: true,
		},
		address: {
			type: String,
			required: [true, "Please you must provide a address"],
			minLength: [2, "Your address must be at least 2 characters"],
			maxLength: [255, "Your address can't have more than 255 characters"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please you must provide a email"],
			unique: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please provide a valid email",
			],
		},
		phone: {
			type: String,
			required: [true, "Please you must provide a phone number"],
			match: [/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gim, "Please provide a valid french like phone number"],
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minLength: [6, "Your password must be at least 6 characters"],
		},
	},
	{ timestamps: true }
);

// We hash the passwords before the document is saved/created
UserSchema.pre("save", async function (next) {
	// Check if the request modifie/create the password.
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// ===== Here METHODS (they are attached to the Model and can be use on a new one initialized) ===== //
UserSchema.methods.createNewToken = async function () {
	return jwt.sign({ userId: this._id, pseudo: this.pseudo }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
