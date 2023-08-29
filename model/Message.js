const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    messageRoomId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    read: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", MessageSchema);
