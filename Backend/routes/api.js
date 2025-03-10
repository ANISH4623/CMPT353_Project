"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const channelController = require("../controllers/channelController");
const messageController = require("../controllers/messageController");

// User routes
router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/users/:id", userController.deleteUser);

// Channel routes
router.post("/channels", channelController.createChannel);
router.get("/channels", channelController.getChannels);

// Message routes
router.post("/messages", messageController.createMessage);
router.post("/messages/reply", messageController.replyToMessage);
router.post("/messages/rate", messageController.rateMessage);

module.exports = router;
