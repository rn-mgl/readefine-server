const UnauthorizedError = require("../errors/unauthorizedError");
const jwt = require("jsonwebtoken");

const headAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Head Bearer ")) {
    throw new UnauthorizedError(`You are not authorized to proceed here.`);
  }

  const token = authHeader.split(" ")[2];

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: verify.id, username: verify.username, email: verify.email, role: verify.role };

  next();
};

module.exports = headAuthMiddleware;
