const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB is now connected"))
  .catch((err) => console.log("failed to connect DB", err));

module.exports = mongoose;
