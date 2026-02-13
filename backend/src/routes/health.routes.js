const express = require("express");
const { health, dbHealth, llmHealth } = require("../controllers/health.controller");

const router = express.Router();

router.get("/", health);
router.get("/db", dbHealth);
router.get("/llm", llmHealth);

module.exports = router;
