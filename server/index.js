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
const auth = require("./passport");

const swagger = require('./swagger');
const retryFailedRequests = require('./retryFailedRequests');
const { isCoolerAdmin } = require("./middlewares/isCoolerAdmin");

// Initialize app
const app = express();
app.use(express.json());

// Set up middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
const filesUpload = multer({ dest: "uploads/images" });

// Set up sessions
app.use(session({
  secret: process.env.COOKIE_KEY,
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

auth(passport);

// Set up Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEYFILE_PATH,
});
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

app.post("/upload", isCoolerAdmin, filesUpload.array("photos", 40), async (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path: filePath, originalname } = req.files[i];
    const ext = path.extname(originalname);
    const newPath = filePath + ext;

    if (fs.existsSync(filePath)) {
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