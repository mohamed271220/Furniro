const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const Order = require("../models/Order");
const passport = require("passport");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});
exports.addProduct = async (req, res, next) => {
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

            const {
                name,
                price,
                sale,
                images,
                sizeOptions,
                Tags,
                shortDescription,
                description,
                salesPackage,
                modal,
                secondaryMat,
                config,
                color,
                fillingMat,
                load,
                origin,
                width,
                height,
                depth,
                weight,
                seatHeight,
                legHeight,
            } = req.body;

            const addedBy = user._id;

            // const sizes=JSON.parse(sizeOptions)
            // console.log(sizes);

            const product = new Product({
                title: name,
                price,
                sale,
                images: JSON.parse(images),
                sizeOptions: JSON.parse(sizeOptions),
                Tags: JSON.parse(Tags),
                shortDescription,
                description: JSON.parse(description),
                salesPackage,
                modal,
                secondaryMat,
                config,
                color: JSON.parse(color),
                fillingMat,
                load,
                origin,
                width,
                height,
                depth,
                weight,
                seatHeight,
                legHeight,
                addedBy,
            });

            // console.log(product);

            const sess = await mongoose.startSession();
            sess.startTransaction();
            await product.save({ session: sess });
            user.addedProducts.push(product);
            await user.save({ session: sess });
            await sess.commitTransaction();
            res
                .status(201)
                .json({ message: "Product added successfully", product: product });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        if (req.user) {
            console.log(req.user);
            const user = await User.findOne({ googleId: req.user.id });

            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                next(error);
            }

            if (user.role !== "admin" || user.role !== "coolerAdmin") {
                const error = new Error("You are not authorized");
                error.statusCode = 404;
                next(error);
            }

            const {
                name,
                price,
                sale,
                images,
                rating,
                sizeOptions,
                Tags,
                shortDescription,
                description,
                salesPackage,
                modal,
                secondaryMat,
                config,
                color,
                fillingMat,
                load,
                origin,
                width,
                height,
                depth,
                weight,
                seatHeight,
                legHeight,
            } = req.body;

            const product = await Product.findById(productId);
            if (!product) {
                const error = new Error("No Product Found");
                error.statusCode = 404;
                throw error;
            }
            product.name = name;
            product.price = price;
            product.sale = sale;
            product.images = images;
            product.rating = rating;
            product.sizeOptions = sizeOptions;
            product.Tags = Tags;
            product.shortDescription = shortDescription;
            product.description = description;
            product.salesPackage = salesPackage;
            product.modal = modal;
            product.secondaryMat = secondaryMat;

            product.config = config;
            product.color = color;
            product.fillingMat = fillingMat;
            product.load = load;
            product.origin = origin;
            product.width = width;

            product.height = height;
            product.depth = depth;
            product.weight = weight;
            product.seatHeight = seatHeight;
            product.legHeight = legHeight;

            const sess = await mongoose.startSession();

            sess.startTransaction();
            await product.save({ session: sess });
            user.addedProducts.push(product);
            await user.save({ session: sess });
            await sess.commitTransaction();

            res.status(201).json({ message: "Edited product Successfully", product });
        }
    } catch (err) {
        const error = new Error("Something went wrong");
        error.statusCode = 500;
        return next(error);
    }
};


exports.removeProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error("No Product Found");
        error.statusCode = 404;
        throw error;
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await product.deleteOne({ session: sess });
        const user = await User.findOne({ googleId: req.user.id });
        user.addedProducts.pull(productId);
        await user.save({ session: sess });
        sess.commitTransaction();
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (err) {
        const error = new Error("Could not delete product");
        error.statusCode = 500;
        return next(error);
    }
};
exports.getOrders = async (req, res, next) => {
    const user = await User.findOne({ googleId: req.user.id });

    if (user.role !== "admin" || user.role !== "coolerAdmin") {
        const error = new Error("You are not authorized");
        error.statusCode = 404;
        return next(error);
    } else {
        try {
            // sort should look like this: { "field": "userId", "sort": "desc"}
            const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
            // console.log(page, pageSize, sort, search);
            // formatted sort should look like { userId: -1 }
            const generateSort = () => {
                const sortParsed = JSON.parse(sort);
                const sortFormatted = {
                    [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
                };

                return sortFormatted;
            };
            const sortFormatted = Boolean(sort) ? generateSort() : {};
            // console.log(sortFormatted);

            const madeBy = search
                ? {
                    $or: [
                        // { totalPrice: { $eq: search } },
                        { status: { $regex: new RegExp(search, "i") } },
                        // { madeBy: { $eq: new mongoose.Types.ObjectId(search) } },
                    ],
                }
                : {};
            const transactions = await Order.find(madeBy)
                .sort(sortFormatted)
                .skip(page * pageSize)
                .limit(pageSize);
            console.log(transactions);
            const total = await Order.countDocuments({
                name: { $regex: search, $options: "i" },
            });
            // console.log(total);
            res.status(200).json({
                transactions,
                total,
            });
        } catch (err) {
            const error = new Error("Could not fetch orders" + err);
            error.statusCode = 500;
            return next(error);
        }
    }
};
exports.updateOrder = async (req, res, next) => {
    const user = await User.findOne({ googleId: req.user.id });

    if (user.role !== "admin" || user.role !== "coolerAdmin") {
        const error = new Error("You are not authorized");
        error.statusCode = 404;
        return next(error);
    } else {
        const orderId = req.params.orderId;
        const { status } = req.body;
        try {
            const order = await Order.findById(orderId);
            order.status = status;
            await order.save();
            res.json({ message: "Order Updated Successfully", order });
        } catch (err) {
            const error = new Error("Could not update order");
            error.statusCode = 500;
            return next(error + " real err " + err);
        }
    }
};