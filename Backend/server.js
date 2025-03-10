"use strict";
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initializeDatabases } = require("./config/db");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());

// Initialize databases
initializeDatabases();

const corOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corOptions));
// Routes
app.use("/api", apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Start server
const PORT = 8080;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
