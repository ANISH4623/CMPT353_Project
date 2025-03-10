"use strict";
const express = require("express");
const nano = require("nano")("http://admin:admin@localhost:5984");
const app = express();
async function createDatabases() {
  try {
    await nano.db.create("users");
    console.log("Database 'users' created.");
  } catch (err) {
    if (err.error === "file_exists") {
      console.log("Database 'users' already exists.");
    } else {
      console.error("Error creating 'users' database:", err);
    }
  }
  try {
    await nano.db.create("channels");
    console.log("Database 'channels' created.");
  } catch (err) {
    if (err.error === "file_exists") {
      console.log("Database 'channels' already exists.");
    } else {
      console.error("Error creating 'channels' database:", err);
    }
  }
  try {
    await nano.db.create("messages");
    console.log("Database 'messages' created.");
  } catch (err) {
    if (err.error === "file_exists") {
      console.log("Database 'messages' already exists.");
    } else {
      console.error("Error creating 'messages' database:", err);
    }
  }
}
createDatabases();
app.listen(8080, "localhost", () => {
  console.log("Server listening on port 8080");
});
