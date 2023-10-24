import mongoose from "mongoose";

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
    tags: [
      {
        type: String,
      },
    ],
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

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;