const express = require("express");
const cors = require("cors");

const specRoutes = require("./routes/spec.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"],
}));

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ working: true });
});

app.use("/api/spec", specRoutes);
app.use("/api/health", healthRoutes);

module.exports = app;
