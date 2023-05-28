const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  posts = require("./routes/posts");
require("dotenv/config");

// process.env.DB_CONNECTION
// "mongodb://localhost/mydb"
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error("Failed! ", error));

app.use(express.json());
app.use("/posts", posts);

app.get("/", (req, res, next) => {
  res.send("We are in Home");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.error(`App working on PORT: ${PORT}`));
