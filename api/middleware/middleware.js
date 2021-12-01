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
    if (user) {
      req.user = { ...user, id };
      next();
    } else {
      next({ status: 404, message: 'not found' });
    }
  } catch (e) {
    console.log(e)
  }
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    next({ status: 400, message: "missing required name" });
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