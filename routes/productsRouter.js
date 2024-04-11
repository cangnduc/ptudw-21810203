let express = require("express");
let router = express.Router();

let productController = require("../controllers/productController");
let cartController = require("../controllers/cartController");
router.get("/", productController.getData, productController.showProducts);
router.get("/cart", cartController.showCart);
router.get(
  "/:id",
  productController.getData,
  productController.showProductDetail
);
router.post("/cart", cartController.addCart);
router.put("/cart", cartController.updateCart);
router.delete("/cart", cartController.removeCart);
router.delete("/cart/clear", cartController.clearCart);
//router.get("/:category", productController.showCategory);
module.exports = router;
