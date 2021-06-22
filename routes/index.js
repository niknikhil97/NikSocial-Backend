const express = require("express");

const router = express.Router();

router.use("/user", require("./users"));
router.get("/", async (req, res) => {});

module.exports = router;
