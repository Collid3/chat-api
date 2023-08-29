const User = require("../model/Users");

const sendRequest = async (req, res) => {
	const userId = req.params.userId;
	const { sender, receiver } = req.body;

	if (!userId || !sender || !receiver) return res.json({ error: "UserId and from is required" });

	try {
		const user = await User.findOne({ _id: userId }).exec();

		if (!user) return res.json({ error: "Couldn't find user with that ID" });

		if (
			user.requests.find(
				(request) => request.sender === sender || request.receiver === sender
			) !== undefined
		) {
			return;
		}

		user.requests.push({ sender, receiver });
		await user.save();

		return res.json({ user });
	} catch (err) {
		console.log(err.message);
	}
};

const replyRequest = async (req, res) => {
	const userId = req.params.userId;
	const { sender, receiver } = req.body;

	if (!userId || !sender || !receiver) return res.json({ error: "UserId and from is required" });

	try {
		const user = await User.findOne({ _id: userId }).exec();
		if (!user) return res.json({ error: "Couldn't find user with that ID" });

		if (
			user.requests.find(
				(request) => request.sender === userId && request.receiver === receiver
			) !== undefined
		) {
			user.requests = user.requests.filter((request) => request.receiver !== receiver);
			await user.save();
			return res.json({ user });
		} else if (
			user.requests.find(
				(request) => request.sender === sender && request.receiver === userId
			) !== undefined
		) {
			user.requests = user.requests.filter((request) => request.sender !== sender);
			await user.save();
			return res.json({ user });
		} else {
			return res.json({ error: "Friend request not found" });
		}
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { sendRequest, replyRequest };
