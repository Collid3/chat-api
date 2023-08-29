const router = require("express").Router();
const AuthController = require("../controllers/Auth");

router.route("/").post(AuthController.Login).delete(AuthController.Logout);

module.exports = router;
