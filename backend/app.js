const path = require("path");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usrRtr = require("./interfaces/routes/users");
const estateRtr = require("./interfaces/routes/estates");
const uploadRtr = require("./interfaces/routes/upload");
const likesRtr = require("./interfaces/routes/likes");
const rvwRtr = require("./interfaces/routes/reviews");
const rvwLikesRtr = require("./interfaces/routes/reviewLikesOrder");
const rvwTimeRtr = require("./interfaces/routes/reviewTimeOrder");

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

// Router
app.use("/api/users", usrRtr);
app.use("/api/estates", estateRtr);
app.use("/api/likes", likesRtr);
app.use("/upload", uploadRtr);
app.use("/api/reviews", rvwRtr);
app.use("/api/reviews", rvwLikesRtr);
app.use("/api/reviews", rvwTimeRtr);

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
