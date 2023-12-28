const FailedRequest = require("../models/FailedRequest");
const User = require("../models/User");
const Order = require("../models/Order");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});




exports.paymentIntent = async (req, res, next) => {
    let products;
    let user;
    console.log(req.user);
    try {
        if (req.user) {
            user = await User.findOne({ googleId: req.user.id });
            // console.log(data);
            products = user.cart;
            if (products.length === 0 || !products) {
                const error = new Error("Cart is empty");
                error.statusCode = 404;
                return next(error);
            }
            const total = products
                .map((p) => p.price * p.number)
                .reduce((acc, prod) => acc + prod, 0);
            console.log(total);
            const totalInCents = Math.round(total * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: totalInCents,
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.send({ clientSecret: paymentIntent.client_secret });

        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};


exports.makeOrder = async (req, res, next) => {
    let products;
    const paymentIntent = req.body.paymentIntent;
    try {
        if (req.user) {
            const user = await User.findOne({ googleId: req.user.id });
            console.log(user);

            if (!user) {
                const error = new Error("Something went wrong , please check your cart");
                error.statusCode = 404;
                next(error);
            }
            const address = user.addresses.find(address => address === req.body.address);
            products = user.cart;
            const total = products
                .map((p) => p.price * p.number)
                .reduce((acc, prod) => acc + prod, 0);
            console.log(products);
            const sess = await mongoose.startSession();
            sess.startTransaction();
            const order = new Order({
                products: products,
                paymentIntent: paymentIntent,
                madeBy: user.id,
                address: address,
                status: "pending",
                totalPrice: total,
            });
            console.log(order);
            await order.save({ session: sess });
            user.cart = [];
            user.orders.push(order);
            await user.save({ session: sess });
            await sess.commitTransaction();
            res.status(201).send({});
        }
    } catch (err) {
        console.log(err);
        // Save the failed request for later retry
        const failedRequest = new FailedRequest({
            endpoint: '/makeOrder',
            method: 'POST',
            data: req.body,
            error: err.message,
        });
        await failedRequest.save();
        return res.status(500).json({ error: err.message });
    }
};

exports.cancelOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            const error = new Error("Could not find order");
            error.statusCode = 404;
            next(error);
        }
        order.status = "cancelled";
        await order.save();
        res.status(201).json({ message: "Order cancelled successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.checkOrderStatus = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            const error = new Error("Could not find order");
            error.statusCode = 404;
            next(error);
        }
        res.status(201).json({ message: "Order status", status: order.status });
    } catch (err) {
        const error = new Error("Something went wrong , please try again later");
        error.statusCode = 404;
        next(error);
    }
};



exports.getOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId).populate("products.product");
        if (!order) {
            const error = new Error("No Order Found");
            error.statusCode = 404;
            throw error;
        }
        res.json({ message: "Order Fetched Successfully", order });
    } catch (err) {
        const error = new Error("Could not fetch order");
        error.statusCode = 500;
        return next(error);
    }
};

