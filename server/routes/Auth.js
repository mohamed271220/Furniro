const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { isUser } = require("../middlewares/isUser");

const router = express.Router();

// Use async/await in all routes and handle errors with a middleware
router.get("/login/success", isUser ,async (req, res, next) => {
  console.log(req.userId);
  if (req.userId) {
    try {
      const user = await User.findOne({ googleId: req.userId });
      if (user) {
        res.status(200).json({
          success: true,
          message: "Successfully Logged In",
          user: req.userId,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found in database" });
      }
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  } else {
    res.status(403).json({ success: false, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL
  }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, 'your-secret-key');
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Database error", details: err.message });
});

module.exports = router;