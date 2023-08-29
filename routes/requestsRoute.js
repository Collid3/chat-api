const router = require("express").Router();
const requestsController = require("../controllers/RequestsController");

router.post("/:userId", requestsController.sendRequest);
router.put("/:userId", requestsController.replyRequest);

module.exports = router;
