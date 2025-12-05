const { admin } = require('../firebaseconfig');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Intentamos obtener la API key desde serviceAccountKey.json si existe
function getApiKey() {
  try {
    const saPath = path.join(__dirname, '..', 'serviceAccountKey.json');
    if (fs.existsSync(saPath)) {
      const sa = require(saPath);
      // No siempre viene API_KEY en el service account, así que revisa env var
      return process.env.FIREBASE_API_KEY || sa.apiKey || null;
    }
  } catch (e) {}
  return process.env.FIREBASE_API_KEY || null;
}

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email y password requeridos' });
    try {
      const user = await admin.auth().createUser({ email, password });
      return res.json({ uid: user.uid, email: user.email });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email y password requeridos' });
    const apiKey = getApiKey();
    if (!apiKey) return res.status(500).json({ error: 'Falta FIREBASE_API_KEY para realizar login' });

    try {
      const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
      const data = await resp.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
      // data.idToken es el token JWT de Firebase
      return res.json({ idToken: data.idToken, refreshToken: data.refreshToken, expiresIn: data.expiresIn });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async logout(req, res) {
    // El logout en Firebase se realiza del lado del cliente
    // El servidor solo devuelve una confirmación
    res.json({ message: 'Sesión cerrada exitosamente' });
  }
};
