const { del } = require("express/lib/application");
const PRODUCTS = require("../model/products");

module.exports = {
  getProducts: async (req, res, next) => {
    const products = await PRODUCTS.find();
    res.json({
      test: "1",
      result: products.map((res) => {
        return {
          id: res.id,
          name: res.name,
          price: res.price,
          desc: res.desc,
        };
      }),
    });
  },
  addProducts: async (req, res) => {
    const products = await new PRODUCTS({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
    }).save();
    res.json({
      message: "iserted success",
      id: products.id,
      name: products.name,
      price: products.price,
      desc: products.desc,
    });
  },
  deleteProducts: async (req, res, next) => {
    const id = req.params.id;
    const del = await PRODUCTS.findByIdAndRemove(id);
    res.json({
      delete: del,
    });
  },
};
