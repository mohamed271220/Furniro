const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const Order = require("../models/Order");
const mongoose = require("mongoose");

exports.postReview = async (req, res, next) => {
    const productId = req.params.productId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        next(error);
    }
    const content = req.body.comment.trim();
    const rating = parseInt(req.body.rating);
    console.log(rating);
    const userId = req.user.id;
    try {
        const product = await Product.findById(productId).populate("reviews");

        //TODO CHECK IF THE PRODUCT IS IN AN ORDER MADE BY THE SAME USER AND IT"S STATUS IS DELIVERED
        if (product.reviews.find((r) => r.user.toString() === userId)) {
            const error = new Error("You have already reviewed this product.");
            error.statusCode = 403;
            return next(error);
        }
        if (!product) {
            const error = new Error("Could not find product.");
            error.statusCode = 404;
            return next(error);
        }

        const review = new Review({
            content: content,
            product: productId,
            rating: rating,
            user: userId,
        });
        if (product.reviews.length === 0) {
            product.rating = rating;
        } else {
            product.rating = (+product.rating + rating) / 2;
        }
        product.reviews.push(review);
        await product.save();
        await review.save();
        res
            .status(201)
            .json({ message: "Review created successfully!", review: review });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    const productId = req.params.productId;

    let user;
    if (req.user) {
        console.log(req.user);
        user = await User.findOne({ googleId: req.user.id });
        // console.log(data);
    }

    const number = req.body.number;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        next(error);
    }

    try {
        if (!req.user) {
            const error = new Error("Could not find user.");
            error.statusCode = 404;
            next(error);
        }
        let existingInCart = user.cart.find(
            (p) => p.product.toString() === productId
        );
        // console.log("+++"+existingInCart);
        if (existingInCart) {
            // console.log(user.cart);
            existingInCart.number = existingInCart.number + number;
        } else {
            user.cart.push({
                product: productId,
                number: number,
                price: product.price - product.price * product.sale,
                name: product.title,
                sale: product.sale,
                image: product.images[0],
            });
        }
        // console.log(user.cart.find((p) => p.product.toString() === productId));

        // console.log(user.cart);
        await user.save();
        res.status(201).json({ message: "Product added to cart", user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.removeFromCart = async (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId);

    let user;
    const number = req.body.number;
    let product;
    if (req.user) {
        console.log(req.user);
        user = await User.findOne({ googleId: req.user.id });
    }
    if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        next(error);
        return
    }

    try {
        product = await Product.findOne({ _id: productId });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return
    }


    if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        next(error);
        return
    }

    try {

        let existingInCart = user.cart.find(
            (p) => p.product.toString() === productId
        );
        // console.log("+++"+existingInCart);
        if (existingInCart) {
            // console.log(user.cart);
            if (existingInCart.number > 1) {
                existingInCart.number = existingInCart.number - number;
            } else {
                const prod = user.cart.find((p) => p.product.toString() === productId);
                user.cart.pull(prod);
            }
        }
        // console.log(user.cart.find((p) => p.product.toString() === productId));

        // console.log(user.cart);
        await user.save();
        res.status(200).json({ user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.getCart = async (req, res, next) => {
    try {

        const user = await User.findOne({ googleId: req.user.id });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
        }
        res.status(200).json({ cart: user.cart });
    }
    catch (err) {
        const error = new Error("Something went wrong!!");
        error.statusCode = 500;
        return next(error);
    }

}






