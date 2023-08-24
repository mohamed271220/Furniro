require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRouter = require("./routes/Auth");
const app = express();

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById().then((user) => done(err, user));
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:4000/auth/google/callback",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate(
//         { googleId: profile.id, username: profile.id },
//         function (err, user) {
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.id },
        function (err, user) {
          return callback(err, profile);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
//   function (req, res) {
//     // Successful authentication, redirect secrets.
//     res.redirect("http://localhost:5173");
//   }
// );

// Logging Middleware
app.use(morgan("dev"));

app.use(helmet());

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server running on port 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// mongoose.set("useCreateIndex", true);

/*
const express = require("express");
const multer = require("multer");
var cors = require("cors");
const fs = require("fs");


const filesUpload = multer({ dest: "uploads/images" });
require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

//file upload
app.post(
    "/api/upload",
    isAdmin,
    filesUpload.array("photos", 40),
    (req, res) => {
      console.log(req.files);
      const uploadedFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads", ""));
      }
      res.json(uploadedFiles);
    }
  );
  



*/
