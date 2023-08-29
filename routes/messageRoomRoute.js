const router = require("express").Router();
const messageRooms = require("../controllers/MessageRoomsController");

router.post("/", messageRooms.createMessageRoom);

router.get("/:userId", messageRooms.getRooms);

router.get("/:userId/:friendId", messageRooms.getRoom);

module.exports = router;
