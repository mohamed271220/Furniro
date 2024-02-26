const User = require("./models/User");
const findOrCreate = require("mongoose-findorcreate");
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;

exports.auth = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  
  passport.use(new GoogleOAuthStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate({ googleId: profile.id });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  ));
};