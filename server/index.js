// packages 
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const path = require("path");
const cookieSession = require("cookie-session");
const { Storage } = require("@google-cloud/storage");
const cron = require('node-cron');

// Load environment variables
require("dotenv").config();

// Import models
const User = require("./models/User");

// Import routes
const authRouter = require("./routes/Auth");
const shopRouter = require("./routes/shop");
const userRouter = require("./routes/user");
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');

// Import other modules
// const passportSetup = require("./passport");
const swagger = require('./swagger');
const retryFailedRequests = require('./retryFailedRequests');

// Initialize app
const app = express();
app.use(express.json());

// Set up middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
  origin: "https://tasks-13c55.web.app",
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Set up sessions
app.use(session({
  secret: 'your secret', // Replace with your actual secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_DB }), // Replace with your MongoDB connection string
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'none',
    secure: true,
  },
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Passport strategy
passport.use(User.createStrategy());
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
    callback(null, user);
  } catch (err) {
    callback(err);
  }
}));

// Set up Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
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

// Set up routes
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/user", userRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use('/post', blogRouter);
app.use('/contact', contactRouter);

// Set up error handling
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const status = error.statusCode || 500;
  const message = error.message || "something went wrong";
  res.status(status).json({ message: message, error: error });
});

// Set up Swagger
swagger(app);

// Set up cron job
cron.schedule('0 * * * *', retryFailedRequests);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });