if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

<<<<<<< HEAD
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
=======
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')
var apiRouter = require('./routes/api.js')
>>>>>>> 997d46e52e437e49f1cb8271716260533cdf30d8

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const getAllUsers = require('./models/user');
(async() => {
  console.log(await getAllUsers())
})();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use('/users', usersRouter); 
=======
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// app.use('/users', usersRouter);
>>>>>>> 997d46e52e437e49f1cb8271716260533cdf30d8

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
