const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());

// página principal
app.get("/", (req, res) => {
  res.send("Alojamento Local – servidor ativo ✅");
});

// rota teste (para o Render)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// manter servidor ativo (OBRIGATÓRIO)
app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor a correr na porta " + PORT);
});
