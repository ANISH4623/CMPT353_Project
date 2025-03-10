"use strict";
const { nano } = require("../config/db");
const messagesDb = nano.use("messages");

const createMessage = async (req, res) => {
  const { channelId, content, screenshot, userId } = req.body;
  try {
    const message = {
      _id: `${channelId}-${Date.now()}`,
      channelId,
      content,
      screenshot: screenshot || null,
      userId,
      type: "message",
      replies: [],
      ratings: { thumbsUp: 0, thumbsDown: 0 },
    };
    const response = await messagesDb.insert(message);
    res.status(201).json({ message: "Message posted", id: response.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const replyToMessage = async (req, res) => {
  const { messageId, content, userId } = req.body;
  try {
    const message = await messagesDb.get(messageId);
    const reply = {
      _id: `${messageId}-reply-${Date.now()}`,
      content,
      userId,
      type: "reply",
      ratings: { thumbsUp: 0, thumbsDown: 0 },
    };
    message.replies.push(reply);
    await messagesDb.insert(message);
    res.status(201).json({ message: "Reply posted", id: reply._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const rateMessage = async (req, res) => {
  const { messageId, thumbsUp } = req.body;
  try {
    const message = await messagesDb.get(messageId);
    if (thumbsUp) {
      message.ratings.thumbsUp += 1;
    } else {
      message.ratings.thumbsDown += 1;
    }
    await messagesDb.insert(message);
    res.json({ message: "Rating updated", ratings: message.ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createMessage, replyToMessage, rateMessage };
