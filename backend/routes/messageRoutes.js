const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Save message
router.post("/", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json(msg);
});

// Get room messages
router.get("/:room", async (req, res) => {
  const messages = await Message.find({ room: req.params.room });
  res.json(messages);
});

module.exports = router;
