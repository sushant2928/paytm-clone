const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith("Bearer")) {
    return res.json(403).json({
      message: "Invalid Auth Token!",
    });
  }
  const token = authHeader.split(" ")[1];
  const result = jwt.verify(token, JWT_SECRET);
  if (result) {
    next();
  }
};

module.exports = {
  authMiddleware,
};
