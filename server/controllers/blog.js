const User = require("../models/User");
const Post = require("../models/BlogPost")

//user

exports.getPosts = async (req, res, next) => {
    const { tag, search } = req.query;
    try {
        if (tag && search) {
            const posts = await Post.find({
                title: { $regex: search, $options: "i" },
                tag
            });
            res.status(200).json({ posts });
        }
        else if (tag) {
            const posts = await Post.find({ tag })
            res.status(200).json({ posts })

        } else if (search) {
            const posts = await Post.find({
                title: { $regex: search, $options: "i" },
            });
            res.status(200).json({ posts });
        }
        else {
            const posts = await Post.find()
            res.status(200).json({ posts })
        }


    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//admin
exports.postPost = async (req, res, next) => {
    try {
        if (req.user) {
            // console.log(req.user);
            const user = await User.findOne({ googleId: req.user.id });

            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                next(error);
            }
            console.log(user);
            if (user.role === "customer") {
                const error = new Error("You are not authorized to post");
                error.statusCode = 404;
                next(error);
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // TODO: take parameters from req.body and complete the function
            const postedBy = user.username;

            const { title, author, image, tag, body } = req.body;
            console.log(title, author, image, tag, body);

            const post = new Post({
                title,
                author,
                image,
                tag,
                body: JSON.parse(body),
                postedBy
            });
            await post.save();
            res.status(201).json({ message: "Post created successfully", post });

        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}