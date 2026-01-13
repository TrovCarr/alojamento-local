const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ===================== SERVIR A UI ===================== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ===================== ALOJAMENTOS ===================== */
app.get("/alojamentos", (req, res) => {
  db.all("SELECT * FROM alojamentos ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/alojamentos", (req, res) => {
  const { nome, endereco } = req.body;
  db.run(
    "INSERT INTO alojamentos (nome, endereco) VALUES (?, ?)",
    [nome, endereco],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

/* ===================== RESERVAS ===================== */
app.get("/reservas", (req, res) => {
  const alojamentoId = req.query.alojamentoId;
  const sql = alojamentoId
    ? "SELECT * FROM reservas WHERE alojamentoId = ? ORDER BY id DESC"
    : "SELECT * FROM reservas ORDER BY id DESC";
  const params = alojamentoId ? [alojamentoId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/reservas", (req, res) => {
  const { hospede, origem, checkin, checkout, valor, estado, alojamentoId } = req.body;
  db.run(
    "INSERT INTO reservas (hospede, origem, checkin, checkout, valor, estado, alojamentoId) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [hospede, origem, checkin, checkout, valor || 0, estado || "confirmada", alojamentoId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

/* ===================== LIMPEZAS ===================== */
app.get("/limpezas", (req, res) => {
  const alojamentoId = req.query.alojamentoId;
  const sql = alojamentoId
    ? "SELECT * FROM limpezas WHERE alojamentoId = ? ORDER BY id DESC"
    : "SELECT * FROM limpezas ORDER BY id DESC";
  const params = alojamentoId ? [alojamentoId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/limpezas", (req, res) => {
  const { descricao, data, estado, alojamentoId } = req.body;
  db.run(
    "INSERT INTO limpezas (descricao, data, estado, alojamentoId) VALUES (?, ?, ?, ?)",
    [descricao, data, estado || "pendente", alojamentoId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

/* ===================== MANUTENÇÕES ===================== */
app.get("/manutencoes", (req, res) => {
  const alojamentoId = req.query.alojamentoId;
  const sql = alojamentoId
    ? "SELECT * FROM manutencoes WHERE alojamentoId = ? ORDER BY id DESC"
    : "SELECT * FROM manutencoes ORDER BY id DESC";
  const params = alojamentoId ? [alojamentoId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/manutencoes", (req, res) => {
  const { descricao, data, estado, alojamentoId } = req.body;
  db.run(
    "INSERT INTO manutencoes (descricao, data, estado, alojamentoId) VALUES (?, ?, ?, ?)",
    [descricao, data, estado || "pendente", alojamentoId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

/* ===================== START ===================== */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor UI+API em http://192.168.1.69:${PORT}`);
});
