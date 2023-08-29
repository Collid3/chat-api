const mongoose = require("mongoose");

const MessageRoomsSchema = mongoose.Schema(
	{
		members: {
			type: Array,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("messageRooms", MessageRoomsSchema);
