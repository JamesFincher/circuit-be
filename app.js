var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var getAllUsers = require("./routes/getAllUsers");
var getUserById = require("./routes/getUserById");
var s3GetAllObjectsRouter = require("./routes/s3GetAllObjects");
var postImageToDb = require("./routes/postImageToDb");
var postImageToS3 = require("./routes/postImageToS3");
var app = express();
var PrismaClient = require("@prisma/client").PrismaClient;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
//aws stuff

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.raw({ type: "image/*", limit: "5mb" }));
app.use("/", indexRouter);
app.use("/local/getAllUsers", getAllUsers);
app.use("/aws/all", s3GetAllObjectsRouter);
app.use("/local/getUserById", getUserById);
app.use("/local/postImageToDb", postImageToDb);
app.use("/aws/postImageToS3", postImageToS3);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
require("dotenv").config();

app.listen(3004, () =>
  console.log("Example app listening on port 3004!, http://localhost:3004")
);
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
