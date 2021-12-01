const express = require("express");
const userRoutes = require("./users/users-router");

const server = express();

server.use(express.json());

// global middlewares
server.use("/api/users", userRoutes);


server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
