const path = require("path");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// CORS
const cors = require("cors");

const userRouter = require("./interfaces/routes/user");
const agencyRouter = require("./interfaces/routes/agency");
const uploadRouter = require("./interfaces/routes/upload");
const likeRouter = require("./interfaces/routes/like");
const reviewRouter = require("./interfaces/routes/review");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors()); // enable CORS

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRouter);

app.use("/api/agency", agencyRouter);
app.use("/api/likes", likeRouter);
app.use("/api/upload", uploadRouter);

app.use("/api/reviews", reviewRouter);

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
  res.render("error");
});

module.exports = app;
