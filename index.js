const Joi = require("joi"),
  express = require("express"),
  app = express(),
  employees = require("./routes/emps_db"),
  users = require("./routes/users"),
  auth = require("./routes/auth"),
  logger = require("./config/logger"),
  mongoose = require("mongoose");
require("express-async-errors");

mongoose
  .connect("mongodb://localhost/mycompany", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => logger.error("Failed! ", error));

app.use("/", employees);
app.use("/users", users);
app.use("/auth", auth);

app.all("*", (req, res, next) => {
  res.status.json({
    status: "false",
    message: "page not found!",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.error(`App working on PORT: ${PORT}`));
