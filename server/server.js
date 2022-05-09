require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/api/user", require("./routes/userRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/paymentRouter"));
app.use("/api", require("./routes/categoryRouter"));

//connect to DB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log("Connect to DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running op port", PORT);
});
