
const express = require("express");
const productController = require("../controllers/shop");
const router = express.Router();


router.get("/products", productController.getProducts);
router.get("/products/:productId", productController.getProduct);

module.exports = router;

