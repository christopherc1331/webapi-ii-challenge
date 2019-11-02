const express = require("express");
const router = express.Router();
const db = require("./data/db.js");

router.post("/", (req, res) => {
  const newPost = req.body;
  console.log(newPost);
  if (newPost) {
    db.insert(newPost)
      .then(addedPost => {
        res.status(201).json({
          success: true,
          addedPost
        });
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          message: "New comment unable to be added",
          err
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "ljsdjljf"
    });
  }
});

router.get("/", (req, res) => {
  db.find(req.query)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving data"
      });
    });
});

module.exports = router;
