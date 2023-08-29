const MessageRooms = require("../model/MessageRooms");
const Message = require("../model/Message");

const createMessage = async (req, res) => {
	const { messageRoomId, sender, text } = req.body;

	if (!messageRoomId || !sender || !text)
		return res.status(401).json({ message: "Invalid Message" });

	const roomExixts = await MessageRooms.findOne({ _id: messageRoomId }).exec();
	if (!roomExixts) return res.status(401).json({ error: "Message room not found" });

	const newMessage = { messageRoomId, sender: sender, text };

	try {
		const result = await Message.create(newMessage);

		return res.status(201).json({ message: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const getMessages = async (req, res) => {
	const messageRoomId = req.params.roomId;

	if (!messageRoomId) return res.status(401).json({ message: "Room id is required" });

	try {
		const result = await Message.find({ messageRoomId: messageRoomId });

		return res.json({ messages: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const getLastMessage = async (req, res) => {
	const messageRoomId = req.params.roomId;

	if (!messageRoomId) return res.status(401).json({ message: "Room id is required" });

	try {
		const message = await Message.find({ messageRoomId: messageRoomId })
			.sort({ updatedAt: -1 })
			.limit(1);

		return res.json({ message: message[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = { createMessage, getMessages, getLastMessage };
