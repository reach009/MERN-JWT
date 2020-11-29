// This middleware performs a validation check on the token, whether
// the token is valid or not and whether the user is loggied in or not

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({
        msg: "No authentication token, access denied",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({
        msg: "Token verification failed, authorization denied",
      });
    }

    req.user = verified.id;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
