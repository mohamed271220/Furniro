
const express = require("express");
const fileUpload = require("../middlewares/fileUpload");
const router = express.Router();
const adminController = require("../controllers/admin");


const env = require("dotenv").config({ path: "./.env" });
const { resolve } = require("path");
const { validateProduct } = require("./validators/product");
const { body } = require("express-validator");
const { isAdmin } = require("../middlewares/isAdmin");
const { isCoolerAdmin } = require("../middlewares/isCoolerAdmin");
router.use(express.static(process.env.STATIC_DIR));




// admin routes
router.post(
    "/product",
    fileUpload.array("images", 4), isAdmin, validateProduct,
    adminController.addProduct
);
router.put(
    "/product/:productId",
    fileUpload.array("images", 4),
    isAdmin,
    validateProduct,
    adminController.editProduct
);
router.delete(
    "/product/:productId",
    isAdmin,
    adminController.removeProduct
);
//for dashboard
router.get(
    "/orders",
    isAdmin,
    adminController.getOrders
);

router.put("/orders/:orderId", isAdmin,body('status').notEmpty().withMessage('Status is required'), adminController.updateOrder);

router.get("/users", isAdmin, adminController.getUsers);
router.get("/users/:userId", isAdmin, adminController.getUser);
router.put("/users/:userId", isAdmin, adminController.updateUser);


router.get("/admins", isAdmin, adminController.getAdmins);
router.get("/admins/:adminId", isAdmin, adminController.getAdmin);
router.put("/admins/:adminId", isCoolerAdmin, adminController.updateAdmin);

module.exports = router;