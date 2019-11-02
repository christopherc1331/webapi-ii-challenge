const express = require("express");
const postsRouter = require("./PostsRouter.js");
const server = express();

server.use("/api/posts", postsRouter);

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
      <h2>Web API - II - Challenge</h>
      <p>Enjoy</p>
    `);
});

module.exports = server;
