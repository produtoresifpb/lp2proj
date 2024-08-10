if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Dependencias
const express = require("express");
const path = require("path");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");

// Middlewares
const notFoundHandler = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");

// Rotas
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const noticeRouter = require("./routes/notice");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(logger("dev"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", indexRouter);
app.use("/edital", noticeRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

// Middlewares para tratamento de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;