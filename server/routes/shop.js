
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const productController = require("../controllers/shop");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
router.use(express.static(process.env.STATIC_DIR));

// stripe 
router.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});

router.get("/products", productController.getProducts);
router.get("/products/:productId", productController.getProduct);

module.exports = router;

