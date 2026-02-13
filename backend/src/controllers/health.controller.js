const pool = require("../db/db");
const { generateSpec } = require("../services/llm.service");

async function health(req, res) {
  res.json({ status: "ok" });
}

async function dbHealth(req, res) {
  try {
    await pool.query("SELECT 1");
    res.json({ database: "connected" });
  } catch {
    res.status(500).json({ database: "error" });
  }
}

async function llmHealth(req, res) {
  try {
    await generateSpec({
      goal: "test",
      users: "test",
      constraints: "none",
      template_type: "web",
    });
    res.json({ llm: "connected" });
  } catch {
    res.status(500).json({ llm: "error" });
  }
}

module.exports = { health, dbHealth, llmHealth };
