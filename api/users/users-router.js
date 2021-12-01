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

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

});

router.post('/:id/posts', validateUser, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// router.use(errorHandling);

module.exports = router;