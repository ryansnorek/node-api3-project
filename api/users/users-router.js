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

// Solution video POST alternative
// Users.insert({ name: req.name })
//   .then(newUser => {
//     res.status(201).json(newUser);
//   })
//   .catch(next)

router.put('/:id', validateUser, validateUserId, async (req, res, next) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (e) { next(e) }
});
// Solution alternative PUT 
// Users.update(req.params.id, { name: req.name })
//   .then(() => {
//     return Users.getById(req.params.id)
//   })
//   .then(user => res.json(user))
//   .catch(next)

router.delete('/:id', validateUserId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id)
    await Users.remove(id);
    res.json(user);
  } catch (e) { next(e) }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts)
  } catch (e) { next(e) }
});

router.post('/:id/posts', 
            validateUserId, 
            validatePost,
            async (req, res, next) => {
              try {
                const result = await Posts.insert({
                  user_id: req.params.id,
                  text: req.text
                });
                res.status(201).json(result);
              } catch (e) { next(e) }
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "you broke eet",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;