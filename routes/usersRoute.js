const router = require("express").Router();
const userController = require("../controllers/UsersController");

router.post("/", userController.createUser);

router
	.route("/:userId")
	.get(userController.getAllUsers)
	.put(userController.uptadeUser)
	.delete(userController.deleteUser);

router.route("/user/:username").get(userController.getOneUser);

router.get("/contacts/:userId", userController.getMyContacts);

module.exports = router;
