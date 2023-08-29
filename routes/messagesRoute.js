const router = require("express").Router();
const MessagesController = require("../controllers/MessagesController");

router.post("/", MessagesController.createMessage);

router.get("/last-message/:roomId", MessagesController.getLastMessage);

router.get("/:roomId", MessagesController.getMessages);

module.exports = router;
