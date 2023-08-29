const User = require("../model/Users");
const MessageRooms = require("../model/MessageRooms");
const getAllUsers = async (req, res) => {
	const userId = req.params.userId;
	if (!userId) return res.status(401).json({ error: "User id is required" });

	try {
		const response = await MessageRooms.find({ members: { $in: [userId] } });

		const response1 = await User.find({ _id: { $ne: userId } });

		const users = response1.filter(
			(user) => response.find((room) => room.members.indexOf(user._id) === 1) === undefined
		);

		return res.json({ users });
	} catch (err) {
		console.log(err.message);
	}
};

const getMyContacts = async (req, res) => {
	const userId = req.params.userId;
	if (!userId) return res.status(401).json({ error: "User id is required" });

	try {
		const response = await MessageRooms.find({ members: { $in: [userId] } });

		const response1 = await User.find({ _id: { $ne: userId } });

		const users = response1.filter(
			(user) =>
				response.find((room) => room.members.indexOf(user._id.toString()) !== -1) !==
				undefined
		);

		return res.json({ users });
	} catch (err) {
		console.log(err.message);
	}
};

const getOneUser = async (req, res) => {
	try {
		const username = req.params.username;
		const user = await User.findOne({ username: username }).exec();

		if (!user) return res.status(401).json({ message: "User not found" });

		return res.json({ user });
	} catch (err) {
		console.log(err.message);
	}
};

const createUser = async (req, res) => {
	const { username, hasAvatar, avatar, email } = req.body;

	if (!username || !email)
		return res.status(401).json({ message: "Username and password required" });

	// check if username already exists in database
	const userExists = await User.findOne({ username: username, email: email });
	if (userExists) return res.status(403).json({ message: "Username already exists" });

	const newUser = {
		username,
		email: email,
		hasAvatar,
		avatar,
	};

	try {
		await User.create(newUser);

		return res.status(201).json({ newUser });
	} catch (err) {
		return console.log(err.message);
	}
};

const uptadeUser = async (req, res) => {
	console.log("update user profile");
};

const deleteUser = (req, res) => {};

module.exports = { createUser, uptadeUser, deleteUser, getAllUsers, getOneUser, getMyContacts };
