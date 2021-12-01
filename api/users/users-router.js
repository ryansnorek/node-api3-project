const express = require('express');

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost
} = require("../middleware/middleware");

const router = express.Router();

router.use(logger);

router.get('/', (req, res) => {
  Users.get()
    .then(users => res.json(users))
    .catch(e => {
      res.status(500).json({ message: e })
    });
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user);
  next();
});

router.post('/', validateUser, (req, res) => {
  res.json({ message: "worked" })
});

router.put('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  // server.use(validateUser);
  // server.use(validateUserId);
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  // server.use(validateUserId);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  // server.use(validateUserId);
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  // server.use(validatePost);
  // server.use(validateUserId);
});

// router.use(errorHandling);

module.exports = router;