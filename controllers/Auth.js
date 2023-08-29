const User = require("../model/Users");
const bcrypt = require("bcrypt");

// Login
const Login = async (req, res) => {
	const { email } = req.body;

	if (!email) return res.json({ error: "Username and password are required" });

	try {
		const user = await User.findOne({ email: email }).exec();

		if (!user) return res.json({ error: "Incorrect username or password" });

		return res.json({ user });
	} catch (err) {
		console.log(err);
	}
};

// Logout
const Logout = (req, res) => {
	try {
		const { id } = req.params.id;

		if (!id) return res.json(401).json({ message: "User id is required" });

		return res.json({ message: "User successfully logged out" });
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { Login, Logout };
