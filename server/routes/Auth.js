const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/login/success", async (req, res) => {
  try {
    console.log(req);
    const data = await User.findOne({ googleId: req.user.id });
    if (data) {
      res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        user: req.user,
        data: data,
      });
    } else {
      res.status(404).json({ error: true, message: "User not found in database" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Database error", details: error.message });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
