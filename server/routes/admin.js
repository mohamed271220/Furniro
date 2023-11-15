
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const router = express.Router();
const adminController = require("../controllers/admin");


const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
const { validateProduct } = require("./validators/product");
const { body } = require("express-validator");
router.use(express.static(process.env.STATIC_DIR));




// admin routes
router.post(
    "/product",
    fileUpload.array("images", 4), validateProduct,
    adminController.addProduct
);
router.put(
    "/product/:productId",
    fileUpload.array("images", 4),
    validateProduct,
    adminController.editProduct
);
router.delete(
    "/product/:productId",
    adminController.removeProduct
);
//for dashboard
router.get(
    "/orders",
    adminController.getOrders
);

router.put("/orders/:orderId", body('status').notEmpty().withMessage('Status is required'),adminController.updateOrder);
module.exports = router;