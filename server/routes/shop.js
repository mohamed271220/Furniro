
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const productController = require("../controllers/shop");
const adminController = require("../controllers/admin");
const blogController = require("../controllers/blog");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.use(express.static(process.env.STATIC_DIR));


router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProduct);



router.post("/products/:productId/review", productController.postReview);



router.post("/products/:productId/cart", productController.addToCart);

router.put("/products/:productId/cart/remove", productController.removeFromCart);

// stripe 

router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

//sends publishable key to frontend
router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});


router.post("/order", productController.makeOrder);

router.post("/create-payment-intent", productController.paymentIntent)


router.put("/order/:orderId/cancel", productController.cancelOrder);

router.get("/order/:orderId/status", productController.checkOrderStatus);

router.get(
  '/cart',
  productController.getCart
)
router.get(
  "/orders",
  adminController.getOrders
);

router.get("/orders/:orderId", productController.getOrder);


// admin routes

//add a product
router.post(
  "/product",
  fileUpload.array("images", 4),
  adminController.addProduct
);

router.put(
  "/product/:productId",
  fileUpload.array("images", 4),
  adminController.editProduct
);

router.delete(
  "/product/:productId",
  adminController.removeProduct
);



router.put("/orders/:orderId", adminController.updateOrder);


router.get("/blog-posts", blogController.getPosts)
router.post("/blog-posts", blogController.postPost)

module.exports = router;
