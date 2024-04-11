const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
router.get("/", controller.showIndex);
router.get("/:page", controller.showPage);
router.get("/api/products", controller.getProducts);

module.exports = router;