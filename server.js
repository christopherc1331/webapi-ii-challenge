const express = require("express");
const postsRouter = require("./PostsRouter.js");
const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Sanity Check</h>
    `);
});

module.exports = server;
