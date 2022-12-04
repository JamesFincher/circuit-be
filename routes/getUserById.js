var express = require("express");

var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Something went wrong with id: ${id}... Error: ${error}`,
    });
  }
});

module.exports = router;
