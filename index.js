const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const productRoute = require("./route/products");
const connection = mongoose.connection;

app.use([bodyParser.urlencoded({ extended: true }), express.json()]);

app.use("/products", productRoute);

mongoose.connect(
  "mongodb+srv://asaad:12345@cluster0.pyxrt.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
connection.on("connected", () => {
  console.log("connected");
});
connection.on("error", () => {
  console.log("error");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("working");
});

module.exports = app;
