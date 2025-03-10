"use strict";
const { nano } = require("../config/db");
const usersDb = nano.use("users");

const createUser = async (req, res) => {
  const { id, password, name, avatar } = req.body;
  try {
    const user = {
      _id: id, // CouchDB uses _id as the primary key
      password, // In production, hash this!
      name,
      avatar: avatar || null,
      type: "user",
    };
    const response = await usersDb.insert(user);
    res.status(201).json({ message: "User created", id: response.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await usersDb.get(id);
    if (user.password === password) {
      // In production, compare hashed passwords
      res.json({
        message: "Login successful",
        user: { id: user._id, name: user.name },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Hardcoded admin check (replace with proper auth in production)
  if (req.user?.id !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  try {
    const user = await usersDb.get(id);
    await usersDb.destroy(id, user._rev);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, loginUser, deleteUser };
