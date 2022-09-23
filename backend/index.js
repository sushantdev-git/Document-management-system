const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // to read the env files

let { connectDB} = require("./config/dbConn");
const auth = require("./middleware/authenticate");

const cors = require('cors')

connectDB()

const app = express();
app.use(cors())
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(auth);


app.use("/file", require("./routes/file"));
app.use("/folder", require("./routes/folder"))
app.use("/user", require("./routes/user"))

const PORT = process.env.PORT || 4000;


mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");

  app.listen(PORT, () => {
    console.log(`Server running of port ${PORT}`);
  });
});
