require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");

const app = express();
const xss = require("xss-clean");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

app.use(cors());
app.use(xss());
app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const port = process.env.PORT || 9000;

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
