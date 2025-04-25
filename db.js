const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://balorinacaphino:pJyAns6Ova8mkeg7@kewi.ak55yvq.mongodb.net/?retryWrites=true&w=majority&appName=kewi"
  )
  .then(() => console.log("DB is now connected"))
  .catch((err) => console.log("failed to connect DB", err));

module.exports = mongoose;
