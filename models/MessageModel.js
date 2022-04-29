const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chatModel" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", MessageModel);
module.exports = Message;
