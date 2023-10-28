//packages 
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const path = require("path");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });
const { Storage } = require("@google-cloud/storage");
//routes
const authRouter = require("./routes/Auth");

//models
const User = require("./models/User");




const app = express();
app.use(express.json());

const filesUpload = multer({ dest: "uploads/images" });

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],

    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});


// Serving static files
// app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

passport.use(User.createStrategy());
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
        {
          googleId: profile.id,
          username: profile.name.givenName + " " + profile.name.familyName,
          email: profile.emails[0].value,
        },
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

// Logging Middleware
app.use(morgan("dev"));

app.use(helmet());

// //file upload
// app.post("/upload", filesUpload.array("photos", 40), (req, res) => {
//   console.log(req.files);
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("uploads", ""));
//   }
//   res.json(uploadedFiles);
// });

// cloud file upload

// Set up Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEYFILE_PATH,
});
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

app.post("/upload", filesUpload.array("photos", 40), async (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path: filePath, originalname } = req.files[i];
    const ext = path.extname(originalname);
    const newPath = filePath + ext;

    // Check if file exists before uploading to Google Cloud Storage
    if (fs.existsSync(filePath)) {
      // Upload file to Google Cloud Storage
      const file = bucket.file(originalname);
      fs.createReadStream(filePath)
        .pipe(file.createWriteStream())
        .on("error", (err) => {
          console.error(err);
          res.status(500).send("Error uploading file to Google Cloud Storage");
        })
        .on("finish", () => {
          uploadedFiles.push(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
          fs.unlinkSync(filePath);
          if (uploadedFiles.length === req.files.length) {
            res.status(200).send(uploadedFiles);
          }
        });
    } else {
      console.error(`File ${filePath} does not exist`);
      res.status(500).send(`File ${filePath} does not exist`);
    }
  }
});




app.use("/auth", authRouter);
app.use("/shop", require("./routes/shop"));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "something went wrong";
  const data = error.data;
  console.log(error);
  res.status(status).json({ message: message, data: data });
});




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
