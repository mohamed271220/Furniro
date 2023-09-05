const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    sizeOptions: [
      {
        size: String,
      },
    ],
    Tags: [
      {
        tag: String,
      },
    ],
    shortDescription: {
      type: String,
      required: true,
    },
    description: [
      {
        paragraph: String,
      },
    ],
    salesPackage: {
      type: String,
      required: true,
    },
    modal: {
      type: String,
      required: true,
    },
    secondaryMat: {
      type: String,
      required: true,
    },
    config: {
      type: String,
      required: true,
    },
    color: [
      {
        c: String,
      },
    ],
    fillingMat: {
      type: String,
      required: true,
    },
    load: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: Number,
    depth: Number,
    weight: Number,
    seatHeight: Number,
    legHeight: Number,
    addedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
