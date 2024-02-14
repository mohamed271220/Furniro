const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      // Log the error and return a generic message to the done callback
      console.error('Failed to deserialize user', err);
      done(new Error('Failed to access the session. Please try again.'));
    } else if (!user) {
      // If no user was found, return an error to the done callback
      done(new Error('No user found with the provided session ID.'));
    } else {
      // If everything went well, return the user object to the done callback
      done(null, user);
    }
  });
});