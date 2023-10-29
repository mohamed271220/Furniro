
const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));


router.post("/products/:productId/review", userController.postReview);
router.post("/products/:productId/cart", userController.addToCart);
router.put("/products/:productId/cart/remove", userController.removeFromCart);
router.get(
    '/cart',
    userController.getCart
)
module.exports = router;