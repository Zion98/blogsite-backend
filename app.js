const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const catRouter = require("./routes/categories");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const multer = require("multer");
const auth = require("./middlewares/auth");
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", auth, upload.single("file"), (req, res) => {
  console.log("file uploadingd##########");
  res.status(200).json("File has been uploaded");
  console.log("file uploaded##########");
});

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/cat", catRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: err.message,
    error: "error",
  });
});

module.exports = app;
