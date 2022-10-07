const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/students-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("database connection established");
  })
  .catch((e) => {
    console.log("db connection failed");
  });
