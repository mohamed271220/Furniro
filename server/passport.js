const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");
const findOrCreate = require("mongoose-findorcreate");

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  passReqToCallback: true,
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await User.findOrCreate({
      googleId: profile.id
    });
    console.log(user);
    cb(null, user.doc);
  } catch (err) {
    cb(err);
  }
}));

// Set up Passport serialization
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user.id);
  });
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});