const path = require("path");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const estatesRouter = require("./routes/estates");
const uploadRouter = require("./routes/upload");
const likesRouter = require("./routes/likes");
const reviewLikesOrderRouter = require("./routes/reviews/reviewLikesOrder");
const reviewTimeOrderRouter = require("./routes/reviews/reviewTimeOrder");

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

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/estates", estatesRouter);
app.use("/api/likes", likesRouter);
app.use("/api/reviews", reviewLikesOrderRouter);
app.use("/api/reviews", reviewTimeOrderRouter);
app.use("/upload", uploadRouter);

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
