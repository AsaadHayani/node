const { product } = require("../models/product");

async function createProduct(params, callback) {
  if (!params.productName) {
    return callback({ message: "Product Name is Required" }, "");
  }
  const productModel = product(params);
  productModel
    .save()
    .then((res) => callback(null, res))
    .catch((error) => callback(error));
}

async function getProduct(params, callback) {
  const productName = params.productName;
  var condition = productName
    ? { $regex: new RegExp(productName), $option: "i" }
    : {};
  product
    .find(condition)
    .then((res) => callback(null, res))
    .catch((error) => callback(error));
}

async function getProductById(params, callback) {
  const productId = params.productId;
  product
    .findById(productId)
    .then((res) => {
      if (!res) callback("product id invalid");
      else return callback(null, res);
    })
    .catch((error) => callback(error));
}

async function updateProduct(params, callback) {
  const productId = params.productId;
  product
    .findByIdAndUpdate(productId, params, { useFindAndModify: false })
    .then((res) => {
      if (!res) callback("product id invalid");
      else return callback(null, res);
    })
    .catch((error) => callback(error));
}

async function deleteProduct(params, callback) {
  const productId = params.productId;
  product
    .findByIdAndRemove(productId)
    .then((res) => {
      if (!res) callback("product id invalid");
      else return callback(null, res);
    })
    .catch((error) => callback(error));
}

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
