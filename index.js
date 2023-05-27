const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  errors = require("./middleware/errors"),
  { MONGO_DB_CONFIG } = require("./config/app.config");

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error("Failed! ", error));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app"));
app.use(errors.errorsHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.error(`App working on PORT: ${PORT}`));
