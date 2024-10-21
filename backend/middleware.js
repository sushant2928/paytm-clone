const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization && !authorization.startsWith("Bearer")) {
      return res.json(403).json({
        message: "Invalid Auth Token!",
      });
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
