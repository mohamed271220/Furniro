import mongoose from "mongoose";
const itemSchema = mongoose.Schema(
  {
    name: {
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
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    sizeOptions: [
      {
        type: String,
      },
    ],
    Tags: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
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
    color: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemSchema);

export default Item;
