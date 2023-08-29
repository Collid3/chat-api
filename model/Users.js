const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	hasAvatar: {
		type: Boolean,
		required: true,
		default: false,
	},
	avatar: {
		type: String,
		required: true,
		default: "",
	},
	requests: {
		type: Array,
	},
	isOnline: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("user", UserSchema);
