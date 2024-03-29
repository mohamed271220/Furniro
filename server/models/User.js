const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  name: String,
  googleId: String,
  password: String,
  secret: String,
  email: {
    required: true,
    type: String,

  },
  cart: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      number: {
        type: Number,
      },
      price: {
        type: Number,
      },
      name: {
        type: String,
      },
      sale: { type: Number },
      image: { type: String },
    },
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
  ],
  addresses: [{
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  }],
  activeAddress: { type: mongoose.Schema.Types.ObjectId },
  phone: String,
  role: {
    type: String,
    default: "customer",
    enum: ["customer", "admin", 'coolerAdmin']
  },
  addedProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
