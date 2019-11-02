const express = require("express");
const router = express.Router();
const db = require("./data/db.js");

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

router.post("/", (req, res) => {
  const newPost = req.body;

  if (newPost && newPost.title !== "" && newPost.contents !== "") {
    db.insert(newPost)
      .then(addedPost => {
        res.status(201).json({
          success: true,
          addedPost
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  db.findPostComments(id)
    .then(comments => {
      res.status(200).json({ success: true, comments });
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/:id/comments", (req, res) => {
  const newComment = req.body;
  const { id } = req.params;
  const idExists = true;

  //   db.findById(id)
  //     .then(comment => {
  //       idExists = true;
  //     })
  //     .catch(err => {
  //       res
  //         .status(404)
  //         .json({ message: "The post with the specified ID does not exist." });
  //     });

  if (idExists && newComment.text !== "") {
    console.log(newComment);
    db.insertComment({
      text: newComment.text,
      post_id: id
    })
      .then(addedComment => {
        res.status(201).json({ success: true, addedComment });
      })
      .catch(err => {
        res
          .status(400)
          .json({ errorMessage: "Error when saving to the server" });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
});

module.exports = router;
