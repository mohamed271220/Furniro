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

exports.getProducts = async (req, res, next) => {
  const { max, search } = req.query;
  try {
    if (max) {
      const products = await Product.find().limit(parseInt(max));
      res.status(200).json({ products });
    } else if (search) {
      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      });
      res.status(200).json({ products });
    } else {
      const products = await Product.find();
      res.status(200).json({ products });
    }
  } catch (err) {
    const error = new Error("Could not fetch products");
    error.statusCode = 500;
    return next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      next(error);
    }
    res.json(product);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

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
    console.log(data);
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
        name: product.name,
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
  const userId = req.user.id;
  const number = req.body.number;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }

  if (!product) {
    const error = new Error("Could not find product.");
    error.statusCode = 404;
    next(error);
  }

  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
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
    res.status(201).json({ message: "Product added to cart", user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.makeOrder = async (req, res, next) => {
  const userId = req.user.id;
  let products;
  try {
    const user = await User.findById(userId);
    if (!user || user.cart.length === 0) {
      const error = new Error("Something went wrong , please check your cart");
      error.statusCode = 404;
      next(error);
    }
    products = user.cart;
    const total = products
      .map((p) => p.price * p.number)
      .reduce((acc, prod) => acc + prod, 0);
    console.log(products);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: total,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const sess = await mongoose.startSession();
    sess.startTransaction();
    const order = new Order({
      products: products,
      address: req.body.address,
      madeBy: userId,
      status: "pending",
      totalPrice: total,
    });
    console.log(order);
    await order.save({ session: sess });
    user.cart = [];
    user.orders.push(order);
    await user.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const error = new Error("Something went wrong , please try again later");
    error.statusCode = 404;
    next(error);
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

exports.addProduct = async (req, res, next) => {
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

      const addedBy = user._id;

      const product = new Product({
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
        addedBy,
      });

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
