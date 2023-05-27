const services = require("../services/products"),
  upload = require("../middleware/upload");

exports.create = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      var model = {
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        productPrice: req.body.productPrice,
        productImage: path != null ? url + "/" + path : "",
      };
      services.createProduct(model, (error, result) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Successfully",
            data: result,
          });
        }
      });
    }
  });
};

exports.findAll = (req, res, next) => {
  var model = {
    productName: req.query.productName,
  };
  services.getProduct(model, (error, result) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Successfully",
        data: result,
      });
    }
  });
};

exports.findOne = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };
  services.getProductById(model, (error, result) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Successfully",
        data: result,
      });
    }
  });
};

exports.update = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      var model = {
        productId: req.params.id,
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        productPrice: req.body.productPrice,
        productImage: path != null ? url + "/" + path : "",
      };
      services.updateProduct(model, (error, result) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Successfully",
            data: result,
          });
        }
      });
    }
  });
};

exports.delete = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };
  services.deleteProduct(model, (error, result) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Successfully",
        data: result,
      });
    }
  });
};
