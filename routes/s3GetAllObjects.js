var express = require("express");
var router = express.Router();

var AWS = require("aws-sdk");

router.get("/", function (req, res, next) {
  //Aws Config
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

  // Call S3 to obtain a list of the objects in the bucket
  const data = s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      res.send(data);
      console.log("Success", data);
    }
  });
});

module.exports = router;
