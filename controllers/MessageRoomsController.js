const MessageRooms = require("../model/MessageRooms");

// create new room
const createMessageRoom = async (req, res) => {
	const { senderId, receiverId } = req.body;
	if (!senderId || !receiverId)
		return res.status(401).json({ error: "SenderId and receiverId are required" });

	const messageRoomExists = await MessageRooms.find({
		members: { $all: [senderId, receiverId] },
	});

	if (messageRoomExists.length > 0)
		return res.status(401).json({ error: "Message room already exists" });

	await MessageRooms.create({
		members: [senderId, receiverId],
	});

	return res.status(201).json({ message: "Room successfully created" });
};

// get rooms of a user
const getRooms = async (req, res) => {
	const userId = req.params.userId;
	if (!userId) return res.status(401).json({ error: "User id is required" });

	const messageRooms = await MessageRooms.find({ members: { $in: [userId] } });
	return res.json({ messageRooms });
};

// get room of user and friend
const getRoom = async (req, res) => {
	const friendId = req.params.friendId;
	const userId = req.params.userId;
	if (!friendId || !userId) return res.status(401).json({ error: "User id is required" });

	const room = await MessageRooms.findOne({ members: { $all: [friendId, userId] } });
	if (!room) return res.status(401).json({ error: "Room not found" });

	return res.json({ room });
};

module.exports = { createMessageRoom, getRooms, getRoom };
