const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your-secret-key', async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.userId = user.userId;

      try {
        const dbUser = await User.findOne({ googleId: req.userId });
        if (!dbUser) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        if (dbUser.role !== "admin" && dbUser.role !== "coolerAdmin") {
          const error = new Error("You are not authorized");
          error.statusCode = 403;
          return next(error);
        }

        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
};