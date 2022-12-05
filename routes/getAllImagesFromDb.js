var express = require("express");

var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", async (req, res) => {
    try {
        const images = await prisma.s3Images.findMany();
    
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: `Something went wrong... Error: ${error}`,
        });
    }
});