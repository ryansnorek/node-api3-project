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
    .catch(() => next({ status: 404, message: "user not found" }));
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    next({ status: 400, message: "missing required name field" });
  } else {
    next();
  }
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