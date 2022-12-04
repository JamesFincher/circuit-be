var express = require("express");

var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//     model S3Images {
//   id        String   @id @default(cuid())
//   name      String
//   url       String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   userId    String
//   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// newImage expects the following object:
// {
// "name": "testing",
// "url": "www.whatever",
// "userId": ""
// }

/* Post image to database. */

router.post("/", async (req, res) => {
  const image = req.body;
  console.log(image);

  try {
    const newImage = await prisma.s3Images.create({
      data: {
        name: image.name,
        url: image.url,
        userId: "clb8pcio50000jv08b96nuc8y",
        //to be uncommented later
        // userId: image.userId,
      },
    });

    res.json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Something went wrong with image: ${image}... Error: ${error}`,
    });
  }
});

module.exports = router;
