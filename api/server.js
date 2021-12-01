const express = require("express");
const userRoutes = require("./users/users-router");
const { logger } = require("./middleware/middleware");

const server = express();

server.use(express.json());

server.use(logger);

server.use("/api/users", userRoutes);

module.exports = server;
