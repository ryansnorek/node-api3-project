const express = require('express');

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const { 
  validateUserId, 
  validateUser, 
  validatePost,
  createUser
} = require("../middleware/middleware");

const router = express.Router();


router.get('/', (req, res, next) => {
  Users.get()
    .then(users => res.json(users))
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => res.json(req.user));

router.post('/', validateUser, createUser, (req, res) => res.json(req.newUser));

router.put('/:id', validateUser, validateUserId, async (req, res, next) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: "nope" });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id)
    await Users.remove(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "fatal errrrrrrr" });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts)
  } catch (e) {
    res.status(500).json({ message: "lewser" });
  }
});

router.post('/:id/posts', 
            validateUserId, 
            validatePost,
            async (req, res) => {
            // RETURN THE NEWLY CREATED USER POST
            try {
              const newPost = { ...req.body, ...req.params.id };
              console.log(newPost)
              const post = await Posts.insert(newPost);
              console.log(post)
              res.json(newPost);
            } catch (e) {
              res.status(500).json({ message: "you broke eet" });
            }

});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "you broke eet",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;