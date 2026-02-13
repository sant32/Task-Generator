const express = require("express");
const { createSpec, getLastFive, getSpecById, updateSpec } = require("../controllers/spec.controller");

const router = express.Router();

router.post("/generate", createSpec);
router.get("/recent", getLastFive);
router.get("/:id", getSpecById);
router.put("/:id", updateSpec);

module.exports = router;
