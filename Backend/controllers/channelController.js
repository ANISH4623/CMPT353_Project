"use strict";
const { nano } = require("../config/db");
const channelsDb = nano.use("channels");

const createChannel = async (req, res) => {
  const { name, creatorId } = req.body;
  try {
    const channel = {
      _id: `${name}-${Date.now()}`, // Unique ID for simplicity
      name,
      creatorId,
      type: "channel",
    };
    const response = await channelsDb.insert(channel);
    res.status(201).json({ message: "Channel created", id: response.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChannels = async (req, res) => {
  try {
    const response = await channelsDb.list({ include_docs: true });
    const channels = response.rows
      .map((row) => row.doc)
      .filter((doc) => doc.type === "channel");
    res.json(channels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createChannel, getChannels };
