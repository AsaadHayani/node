const express = require("express"),
  router = express.Router(),
  productsController = require("../controller/products");

router.post("/products", productsController.create);
router.get("/products", productsController.findAll);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

module.exports = router;
