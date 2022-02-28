const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  deleteProducts,
} = require("../logic/products");

router.get("/", getProducts);
router.post("/", addProducts);
router.delete("/:id", deleteProducts);

module.exports = router;
