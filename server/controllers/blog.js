const User = require("../models/User");
const Post = require("../models/BlogPost")

//user


exports.getPosts = async (req, res, next) => {
  const { tag, search, limit } = req.query;
  try {
    let query = {};
    if (tag) {
      query.tag = tag;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : undefined);
    res.status(200).json({ posts });

  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    let post = await Post.findById(postId);
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

