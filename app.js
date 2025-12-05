const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const routineRoutes = require("./routes/routineRoutes");
const authRoutes = require("./routes/authRoutes");
const metaRoutes = require("./routes/metaRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const diarioRoutes = require("./routes/diarioRoutes");
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 3000;

// Configuración HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, "certs", "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "localhost.pem"))
};

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

// Rutas
app.use("/auth", authRoutes);
// Rutas protegidas: requieren token Bearer (idToken)
app.use("/routines", authMiddleware, routineRoutes);
app.use('/metas', authMiddleware, metaRoutes);
app.use('/agenda', authMiddleware, agendaRoutes);
app.use('/diario', authMiddleware, diarioRoutes);

// Rutas de vistas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
w
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ Servidor HTTPS activo en https://localhost:${PORT}`);
});
