const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.db"));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS alojamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospede TEXT,
    origem TEXT,
    checkin TEXT,
    checkout TEXT,
    valor REAL,
    estado TEXT,
    alojamentoId INTEGER
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS manutencoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    data TEXT,
    estado TEXT,
    alojamentoId INTEGER
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS limpezas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    data TEXT,
    estado TEXT,
    alojamentoId INTEGER
  )`);
});

module.exports = db;
