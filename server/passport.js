const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");

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
    callback(null, profile);
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