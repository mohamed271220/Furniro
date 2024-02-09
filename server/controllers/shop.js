const Product = require("../models/Product");
const mongoose = require("mongoose");



exports.getProducts = async (req, res, next) => {
  const { max, search } = req.query;
  try {
    if (max && search) {
      const products = await Product.find({
        title: { $regex: search, $options: "i" },
      }).limit(parseInt(max));
      res.status(200).json({ products });
    }
    else if (max) {
      const products = await Product.find().limit(parseInt(max));
      res.status(200).json({ products });
    } else if (search) {
      const products = await Product.find({
        title: { $regex: search, $options: "i" },
      });
      res.status(200).json({ products });
    } else {
      const products = await Product.find();
      res.status(200).json({ products });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
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


