const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Use async/await in all routes and handle errors with a middleware
router.get("/login/success", async (req, res, next) => {

    try {
      const user = await User.findOne({ googleId: req.user.id });
      if (user) {
        res.status(200).json({
          success: true,
          message: "Successfully Logged In",
          user: req.user,
          data: user,
        });
      } 
      
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
      // next(error); // Pass the error to the error handling middleware
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
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) return next(err);
      res.redirect(process.env.CLIENT_URL);
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Database error", details: err.message });
});

module.exports = router;