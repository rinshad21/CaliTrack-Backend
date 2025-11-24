const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({
      message: "unauthorized, jwt token",
    });
  }

  try {
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
      level: decoded.level,
    };

    next();
  } catch (error) {
    return res.status(403).json({
      message: "unauthorized, jwt token is wrong or expired",
    });
  }
};

module.exports = ensureAuthenticated;
