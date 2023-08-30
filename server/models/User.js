const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  googleId: String,
  secret: String,
  email: {
    type: String,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
