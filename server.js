const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`
      <h2>Web API - II - Challenge</h>
      <p>Enjoy</p>
    `);
});

module.exports = server;
