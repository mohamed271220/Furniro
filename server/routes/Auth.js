const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    const data = await User.findOne({ googleId: req.user.id });
    console.log(data);
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
      data: data,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
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

//Authorization
//const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// router.get('/profile', isLoggedIn, (req, res) => {
//     res.render('profile.ejs', {
//         user: req.user
//     });
// });

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }

//     res.redirect('/login');
// }

// module.exports = router;
