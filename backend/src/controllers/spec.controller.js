const pool = require("../db/db");
const { generateSpec } = require("../services/llm.service");

async function createSpec(req, res) {
  try {
    const { title, goal, users, constraints, template_type } = req.body;

    if (!goal || !users || !constraints) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const generated = await generateSpec(req.body);

    const result = await pool.query(
      `INSERT INTO specs (title, goal, users, constraints, template_type, generated_output)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, goal, users, constraints, template_type, generated]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate spec" });
  }
}

async function getLastFive(req, res) {
  try {
    const result = await pool.query(
      `SELECT * FROM specs ORDER BY created_at DESC LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch specs" });
  }
}


async function getSpecById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM specs WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Spec not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch spec" });
  }
}

async function updateSpec(req, res) {
  try {
    const { id } = req.params;
    const { generated_output } = req.body;

    if (!generated_output) {
      return res.status(400).json({ error: "generated_output is required" });
    }

    const result = await pool.query(
      `UPDATE specs
       SET generated_output = $1
       WHERE id = $2
       RETURNING *`,
      [generated_output, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Spec not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update spec" });
  }
}


module.exports = { createSpec, getLastFive, getSpecById, updateSpec };


