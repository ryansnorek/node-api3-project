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

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) req.user = { ...user, id };
    else res.status(404).json({ message: "not found" });
    next();
  } catch (e) {
    console.log(e)
  }
}

function validateUser(req, res, next) {
  if (req.body.name) next();
  else res.status(400).json({ message: "missing required name" });
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

async function createUser(req, res, next) {
  try {
    const newUser = await Users.insert(req.body);
    req.newUser = { ...req.body, ...newUser };
    next();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  createUser
};