const express = require("express");
const userRoutes = require("./users/users-router");
const middleware = require("./middleware/middleware");
const { logger, validateUserId, validateUser, validatePost } = middleware;

const server = express();

server.use(express.json());

server.use("/api/users", userRoutes);

server.use(logger);
server.use(validateUserId);
server.use(validateUser);
server.use(validatePost);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
