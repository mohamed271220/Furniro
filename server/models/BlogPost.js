const mongoose = require("mongoose");

const blogPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: [
      {
        type: {
          type: String,
          enum: ["title", "paragraph", "image"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },

    comments: [
      {
        author: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("BlogPost", blogPostSchema);
