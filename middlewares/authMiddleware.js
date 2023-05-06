const unauthorizedError = require("../errors/unauthorizedError");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthorizedError(`Please log in before you proceed. Thank you.`);
  }

  const token = authHeader.split(" ")[1];

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: verify.userId, name: verify.name, email: verify.email };

  next();
};

module.exports = authMiddleware;
