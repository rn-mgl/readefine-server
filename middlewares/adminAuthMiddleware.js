const UnauthorizedError = require("../errors/unauthorizedError");
const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Admin Bearer ")) {
    throw new UnauthorizedError(`You are unauthorized to proceed here.`);
  }

  const token = authHeader.split(" ")[2];

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: verify.admin_id, username: verify.username, email: verify.email };

  next();
};

module.exports = adminAuthMiddleware;
