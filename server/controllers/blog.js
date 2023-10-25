const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const Order = require("../models/Order");
const Post = requite("../models/BlogPost")
const passport = require("passport");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

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
                const error = new Error("You are not authorized");
                error.statusCode = 404;
                next(error);
            }
            // TODO: take parameters from req.body and complete the function
            const postedBy = user.name
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}