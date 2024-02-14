const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/login/success", async (req, res) => {
  if (req.user && req.user.id) {
    try {
      const user = await User.findOne({ googleId: req.user.id });
      if (user) {
        res.status(200).json({
          success: true,
          message: "Successfully Logged In",
          user: req.user,
          data: user,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found in database" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Database error", details: error.message });
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

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // On success, redirect to the CLIENT_URL.
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;