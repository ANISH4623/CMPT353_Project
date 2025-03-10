"use strict";
const nano = require("nano")("http://admin:admin@localhost:5984");

async function initializeDatabases() {
  const databases = ["users", "channels", "messages"];

  for (const dbName of databases) {
    try {
      await nano.db.create(dbName);
      console.log(`Database '${dbName}' created.`);
    } catch (err) {
      if (err.error === "file_exists") {
        console.log(`Database '${dbName}' already exists.`);
      } else {
        console.error(`Error creating '${dbName}' database:`, err);
      }
    }
  }
}

module.exports = {
  nano,
  initializeDatabases,
};
