const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor a correr na porta " + PORT);
});
