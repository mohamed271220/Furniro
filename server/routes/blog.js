
const express = require("express");
const blogController = require("../controllers/blog");
const router = express.Router();



router.get("/all", blogController.getPosts)
router.get("/:postId", blogController.getPost)
module.exports = router;