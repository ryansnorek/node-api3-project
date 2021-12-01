const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] 
      ${req.method} to 
      ${req.url} from 
      ${req.get("Origin")}`
  );
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(res => {
      req.user = res;
      next();
    })
    .catch(e => next({ message: e }));
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};