const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");
const findOrCreate = require("mongoose-findorcreate");

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, callback) => {
  try {
    const user = await User.findOrCreate({
      googleId: profile.id,
      username: profile.name.givenName + " " + profile.name.familyName,
      email: profile.emails[0].value,
    });
    console.log(user);
    callback(null, user.doc);
  } catch (err) {
    callback(err);
  }
}));

// Set up Passport serialization
passport.serializeUser((user, done) => {
  done(null, user);
});


// Set up Passport deserialization
passport.deserializeUser((id, done) => {
  console.log(id); // Log the user ID
  User.findById(id, (err, user) => {
    console.log(user); // Log the user object
    done(err, user);
  });
});